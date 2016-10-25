/* global React, ReactDOM, $ */


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
      <tr>
        <td className="icon"><PackListItemIcon name={this.props.name} /></td>
        <td className="pack">{this.props.name} <span className="version">{this.props.version}</span></td>
        <td className="description">
          {this.props.children}
          <PackListItemKeywords queryChange={this.props.queryChange} keywords={this.props.keywords} />
        </td>
        <td className="author">{this.props.author}</td>
      </tr>
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
        <input id="pack-query" type="text" placeholder="Search the directory..." value={this.state.query} onChange={this.handleQueryChange} />
        <table>
          <thead>
            <tr>
              <th colSpan="2">Pack</th>
              <th>Description</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            {packNodes}
          </tbody>
        </table>
      </div>
    );
  }
});

const type_packs = function (packs) {
  var packNames = packs.map(function(pack) {
    return pack.name;
  });
  $("#pack-install").typed({
    strings: packNames,
    shuffle: true,
    backDelay: 2000,
    loop: true,
    showCursor: false
  });
};

ReactDOM.render(
  <PackList />,
  document.getElementById("packs")
);
