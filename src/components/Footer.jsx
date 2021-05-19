import React from 'react';


const Footer = React.createClass({
  render() {
    return (
      <footer>
        <div className="container-fluid main-container">
          © 2015-{ new Date().getFullYear() } StackStorm <span className="heart">❤️</span>
          <ul className="footer-nav">
            <li>
              <a href="https://stackstorm.org" target="_blank">
                <span>StackStorm.org</span>
              </a>
            </li>
            <li>
              <a href="https://github.com/StackStorm" target="_blank">
                <i className="fa fa-github"></i>
                <span>StackStorm</span>
              </a>
            </li>
            <li>
              <a href="https://github.com/StackStorm-Exchange" target="_blank">
                <i className="fa fa-github"></i>
                <span>StackStorm-Exchange</span>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    );
  }
});

export default Footer;
