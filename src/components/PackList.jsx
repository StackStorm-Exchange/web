import type_packs from './type_packs.js';

const PackListItemKeywords = React.createClass({
  render: function() {

    if (!this.props.keywords)
      return null;

    var queryChange = this.props.queryChange;
    var keywords = this.props.keywords.map(function(keyword) {
      return (
        <li onClick={queryChange}>{keyword}</li>
      );
    });
    return (
      <ul className="keywords">
        {keywords}
      </ul>
    );
  }
});

const PackListItemIcon = React.createClass({
  getInitialState: function() {
    return {
      image_url: "https://index.stackstorm.org/v1/icons/"+this.props.name+".png"
    };
  },
  useDefault: function() {
    this.setState({"image_url": "assets/images/default-icon.png"});
  },
  render: function() {
    return (
      <img width="32" height="32" src={this.state.image_url} onError={this.useDefault} />
    );
  }
});

const PackListItem = React.createClass({
  render: function() {
    return (
      <li className="pack card">
        <div className="card-block">
          <div className="icon"><PackListItemIcon name={this.props.name} /></div>
          <h4 className="card-title">
            {this.props.name} <span className="version">{this.props.version}</span>
          </h4>
          <div className="card-subtitle text-muted">{this.props.author}</div>
          <div className="install">Install</div>
        </div>
        <div className="card-block description">
          {this.props.children}
          <PackListItemKeywords queryChange={this.props.queryChange} keywords={this.props.keywords} />
        </div>
        <div className="card-block content">
          <PackContent content={this.props.content} />
        </div>
        <div className="card-block install">
          <h5>Install {this.props.name}</h5>
          <div>

            <h6>StackStorm latest (2.1+)</h6>
            <pre class="code">
              st2 pack install <span class="name-highlight">{this.props.name}</span>
            </pre>

            <h6>StackStorm legacy</h6>
            <pre class="code">
              st2 run packs.install packs=<span class="name-highlight">{this.props.name}</span> repo_url=<span class="name-highlight">{this.props.repo_url}</span> subtree=false
            </pre>

            <h6>Clone from GitHub</h6>
            <p>To download the pack manually, just clone it from git:</p>
            <pre class="code">
              git clone <span class="name-highlight">{this.props.repo_url}</span>
            </pre>
            <p>Open an issue or a Pull Request: <a href="https://github.com/StackStorm-Exchange/stackstorm-{this.props.name}">StackStorm-Exchange/stackstorm-{this.props.name}</a></p>

          </div>
        </div>
      </li>
    );
  }
});

const PackContent = React.createClass({
  render: function() {
    var pack_content = [];

    this.props.content.forEach(function(key) {
      pack_content.push({type: key, count: this.props.content[key]});
    });

    return (
      <ul>
        {for item in this.pack_content}
        <li><span class="type">{item.type}:</span> <span class="count">{item.count}</span></li>
        {endfor}
      </ul>
    );
  }
});


const PackList = React.createClass({
  getInitialState: function() {
    return {query: "", packs: []};
  },
  handleQueryChange: function(e) {
    this.setState({query: (e.target.value || e.target.innerHTML)});
  },
  componentDidMount: function() {
    $.ajax({
      url: "assets/index.json",
      dataType: "json",
      cache: false,
      success: function(data) {
        var packs = Object.keys(data["packs"]).map(function(key) { return data["packs"][key]; });
        this.setState({"packs": packs});
        type_packs(packs);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    var handleQueryChange = this.handleQueryChange;
    const applyFilter = function(query, packs) {
      query = query || "";
      return packs.filter(function(pack) {
        if (pack.author.indexOf(query) >= 0
          || pack.name.indexOf(query) >= 0
          || pack.description.indexOf(query) >= 0
          || pack.version.toString().indexOf(query) >= 0
          || pack.keywords && pack.keywords.join("/").indexOf(query) >= 0)
          return true;
      });
    };
    var packNodes = applyFilter(this.state.query, this.state.packs).map(function(pack) {
      return (
        <PackListItem author={pack.author} name={pack.name}
                      version={pack.version} keywords={pack.keywords}
                      queryChange={handleQueryChange}>
          {pack.description}
        </PackListItem>
      );
    });
    return (
      <div>
        <input id="pack-query" type="text" placeholder="Search" value={this.state.query} onChange={this.handleQueryChange} />

          <div className="card-deck-wrapper">
            <ul className="card-deck">
                {packNodes}
            </ul>
          </div>

      </div>
    );
  }
});

export default PackList;
