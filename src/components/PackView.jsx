import 'bootstrap/js/dist/tooltip';

import Masonry from 'masonry-layout';
import React from 'react';
import Clipboard from 'clipboard/dist/clipboard';
import $ from 'jquery';

import type_packs from './PackType';
import categories from './categories.json';


const Pack = React.createClass({
  copyCommand(e) {
    const target = $(e.target).closest('a');
    target.addClass('copied').tooltip('hide');
    setTimeout((() => { target.removeClass('copied'); }), 1000);
  },
  render() {
    return (
      <div className="card pack">
        <div className="card-header">
          <div className="icon"><PackIcon name={this.props.slug} /></div>
          <h4 className="card-title">
            {this.props.name}
          </h4>
          <a
            className="btn btn-sm btn-github" href={this.props.repo_url}
            rel="noopener noreferrer" target="_blank"
          ><i className="fa fa-github" /></a>
          <a
            rel="button" tabIndex="-1" className="btn btn-sm btn-copy"
            data-clipboard-text={`st2 pack install ${this.props.ref}`}
            data-title="Copy install command"
            data-trigger="click"
            data-placement="bottom"
            data-toggle="tooltip"
            onClick={this.copyCommand}
          ><i className="fa fa-paste" /></a>
        </div>
        <div className="card-block description">
          {this.props.children}
          <PackKeywords queryChange={this.props.queryChange} keywords={this.props.keywords} />
        </div>
        <div className="card-footer">
          <div className="row">
            <div className="version">
              v{this.props.version}
              { this.props.content && this.props.content.tests
                ? <i className="fa fa-check-circle-o" data-toggle="tooltip" data-placement="bottom" title="This pack has test coverage." />
                : '' }
            </div>
            <div className="author">{this.props.author}</div>
          </div>
        </div>
      </div>
    );
  },
});

const PackKeywords = React.createClass({
  render() {
    if (!this.props.keywords) {
      return null;
    }

    const queryChange = this.props.queryChange;
    const keywords = this.props.keywords.map(keyword =>
      <li className="tag tag-default" key={keyword} onClick={queryChange}>{keyword}</li>
    );
    return (
      <ul className="keywords">
        {keywords}
      </ul>
    );
  },
});

const PackIcon = React.createClass({
  getInitialState() {
    return {
      image_url: `https://index.stackstorm.org/v1/icons/${this.props.name}.png`,
    };
  },
  useDefault() {
    this.setState({ image_url: 'assets/images/default-icon.png' });
  },
  render() {
    return (
      <img
        width="32" height="32"
        src={this.state.image_url} onError={this.useDefault} role="presentation"
      />
    );
  },
});

// TODO: Remove if not in use
const PackContent = React.createClass({
  render() {
    const content = this.props.content;
    let contentText = '';
    if (content) {
      let contentCount = 0;
      Object.keys(content).map((key) => {
        if (key !== 'tests') {
          contentCount += content[key].count;
          contentText += `${key.charAt(0).toUpperCase() + key.slice(1)}: ${content[key].count}<br />`;
        }
      });
      return (
        <div className="progress-wrapper">
          <div
            className="progress" title={contentText}
            data-toggle="tooltip" data-placement="bottom"
          >
            {Object.keys(content).map((key) => {
              if (key !== 'tests') {
                const style = {
                  width: `${(content[key].count / contentCount) * 100}%`,
                };
                return (
                  <div className={`progress-bar ${key}`} style={style} key={key} />
                );
              }
              return null;
            })}
          </div>
        </div>
      );
    }
    return null;
  },
});

const PackView = React.createClass({
  getInitialState() {
    return { query: '', packs: [], category: '-1', masonry: null, queryTimer: null };
  },
  categoryToggle(e) {
    if (this.state.category === e.target.dataset.category) {
      this.setState({ category: '-1' });
    } else {
      this.setState({ category: e.target.dataset.category });
    }
  },
  loadHash() {
    const query = window.location.hash.slice(1);
    if (this.state.query !== query) {
      this.setState({ query });
    }
    this.queryInput.value = query;
  },
  componentDidMount() {
    const loadHash = this.loadHash;
    const clipboard = new Clipboard('.btn-copy');
    $('body').tooltip({
      selector: '[data-toggle="tooltip"]',
      delay: { show: 300, hide: 100 },
      html: true,
    });
    $.ajax({
      url: 'https://index.stackstorm.org/v1/index.json',
      dataType: 'json',
      cache: false,
      success: function (data) {
        const packs = Object.keys(data.packs).map(key => data.packs[key]).sort((a, b) => {
          const ln = a.name.toLowerCase();
          const rn = b.name.toLowerCase();
          if (ln < rn) { return -1; }
          if (ln > rn) { return 1; }
          return 0;
        });
        this.setState({ packs });
        type_packs(packs);
      }.bind(this),
      error(xhr, status, err) {
        console.error(status, err.toString());
      },
    });

    this.state.masonry = new Masonry('.pack-deck', {
      itemSelector: '.card',
      columnWidth: '.pack-sizer',
      percentPosition: true,
    });

    loadHash();
    window.addEventListener('hashchange', loadHash);
  },
  componentDidUpdate() {
    this.state.masonry.reloadItems();
    this.state.masonry.layout();
  },
  handleQueryChange(e) {
    const query = e.target.value || e.target.innerHTML;
    clearTimeout(this.state.queryTimer);
    this.state.queryTimer = setTimeout(() => {
      window.location.hash = `#${query}`;
      this.setState({ query });
    }, 200);
  },
  categories,
  render() {
    const handleQueryChange = this.handleQueryChange;
    const categoryToggle = this.categoryToggle;
    const currentCategory = this.state.category;
    const categories = this.categories;
    const applyFilter = (q, packs) => {
      const query = q || '';
      return packs.filter((pack) => {
        if ((pack.author.indexOf(query) >= 0
          || pack.name.indexOf(query) >= 0
          || pack.description.indexOf(query) >= 0
          || pack.version.toString().indexOf(query) >= 0
          || (pack.keywords && pack.keywords.join('/').indexOf(query) >= 0))
          && (currentCategory === '-1' || categories[currentCategory].packs.indexOf(pack.name) >= 0)) {
          return true;
        }
        return false;
      });
    };
    const packNodes = applyFilter(this.state.query, this.state.packs).map((pack) => {
      return (
        <Pack
          key={pack.name} slug={pack.ref || pack.name} queryChange={handleQueryChange} {...pack}
        >
          {pack.description}
        </Pack>
      );
    }
    );

    return (
      <div>
        <div className="pack-search">
          <div className="container-fluid main-container">
            <div className="row">

              <div className="search-block filter-input-block col-md-2">
                <input
                  id="pack-query" className="form-control"
                  type="text" placeholder="Search" ref={(c) => { this.queryInput = c; }}
                  onChange={this.handleQueryChange}
                />
                <i className="fa fa-search" />
              </div>


              <div className="search-block col-md-10 filter-categories">
                <div className="btn-group">

                  <a onClick={categoryToggle} data-category="-1" tabIndex="-1" className={`category-btn btn btn-outline-primary${currentCategory === '-1' ? ' active' : ''}`}>
                    All
                  </a>
                  {categories.map((category, index) => (
                    <a key={index} className={`category-btn btn btn-outline-primary${currentCategory === index.toString() ? ' active' : ''}`} onClick={categoryToggle} data-category={index} tabIndex="-1">
                      {category.displayName}
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="container-fluid main-container">
          <div className="pack-deck">

            <div className="pack-sizer" />
            {packNodes}

          </div>
        </div>
      </div>
    );
  },
});

export default PackView;
