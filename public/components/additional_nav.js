var React = require('react');

var AdditionalNavigation = React.createClass({
  render(){
    return (
      <div className="additional-nav">
        <div className="nav-container">
          <div className="additional-menu-option">Current Reviews</div>
          <div className="spliter">&#149;</div>
          <div className="additional-menu-option">Previous Reviews</div>
        </div>
      </div>
    );
  }
});

module.exports = AdditionalNavigation;
