import Masonry from 'masonry-layout';
import React from 'react';

import type_packs from 'components/PackType';
import categories from './categories.json';

const Pack = React.createClass({
  render() {
    return (
      <div className="card pack">
        <div className="card-header">
          <div className="icon"><PackIcon name={this.props.name} /></div>
          <h4 className="card-title">
            {this.props.name}
          </h4>
          <a className="btn btn-sm btn-outline-secondary fa fa-github" href="" />
          <div className="btn btn-sm btn-outline-primary fa fa-download" />
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
        <PackContent content={this.props.content} />
        <div className="card-block install">
          <h5>Install {this.props.name}</h5>
          <div>

            <h6>Install</h6>
            <pre className="code">
              st2 pack install <span className="name-highlight">{this.props.name}</span>
            </pre>

            <h6>StackStorm legacy</h6>
            <pre className="code">
              st2 run packs.install packs=<span className="name-highlight">{this.props.name}</span> repo_url=<span className="name-highlight">{this.props.repo_url}</span> subtree=false
            </pre>

            <h6>Work on GitHub</h6>
            <p>To download the pack manually, just clone it from git:</p>
            <pre className="code">
              git clone <span className="name-highlight">{this.props.repo_url}</span>
            </pre>
            <p>Open an issue or a Pull Request: <a href="https://github.com/StackStorm-Exchange/stackstorm-{this.props.name}">StackStorm-Exchange/stackstorm-{this.props.name}</a></p>

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
    return { query: '', packs: [], category: -1, masonry: null };
  },
  handleQueryChange(e) {
    this.setState({ query: (e.target.value || e.target.innerHTML) });
  },
  categoryToggle(e) {
    if (this.state.category === e.target.dataset.category) {
      this.setState({ category: -1 });
    } else {
      this.setState({ category: e.target.dataset.category });
    }
  },
  componentDidMount() {
    $.ajax({
      url: 'assets/index.json',
      dataType: 'json',
      cache: false,
      success: function (data) {
        const packs = Object.keys(data.packs).map((key) => { return data.packs[key]; });
        this.setState({ packs });
        type_packs(packs);
      }.bind(this),
      error(xhr, status, err) {
        console.error(status, err.toString());
      },
    });
    this.setState({
      masonry: new Masonry('.pack-deck', {
        itemSelector: '.card',
        columnWidth: '.pack-sizer',
        percentPosition: true,
      }),
    });
  },
  componentDidUpdate() {
    this.state.masonry.reloadItems();
    this.state.masonry.layout();
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
          && (currentCategory == -1 || categories[currentCategory].packs.indexOf(pack.name) >= 0)) {
          return true;
        }
        return false;
      });
    };
    const packNodes = applyFilter(this.state.query, this.state.packs).map((pack) => {
      return (
        <Pack
          key={pack.name} author={pack.author} name={pack.name}
          version={pack.version} keywords={pack.keywords}
          content={pack.content} queryChange={handleQueryChange}
        >
          {pack.description}
        </Pack>
      );
    });

    return (
      <div>
        <div className="pack-search row">
          <div className="col-md-5">
            <div className="search-block">
              <input
                id="pack-query" className="form-control"
                type="text" placeholder="Search" value={this.state.query}
                onChange={this.handleQueryChange}
              />
            </div>
          </div>
          <div className="col-md-7">
            <div className="search-block">
              <ul>
                <li
                  className={`btn btn-secondary${currentCategory === -1 ? ' active' : ''}`}
                  onClick={categoryToggle} data-category="-1"
                >
                  All
                </li>
                {categories.map((category, index) => (
                  <li
                    className={`btn btn-secondary${currentCategory === index ? ' active' : ''}`}
                    onClick={categoryToggle} data-category={index}
                    key={index}
                  >
                    {category.displayName}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="pack-deck">

          <div className="pack-sizer" />
          {packNodes}

        </div>
      </div>
    );
  },
});

export default PackView;
