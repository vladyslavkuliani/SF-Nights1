var React = require('react');

var Header = React.createClass({
  home(){
    window.location.replace("/profile");
  },
  clubsAroundMe(){
    window.location.replace("/places");
  },
  logOut(){
    window.location.replace('/logout');
  },

  render(){
    return (
      <div className="header">
        <div className="menu-option" onClick={this.home.bind(this)}>Home</div>
        <div className="menu-option" onClick={this.clubsAroundMe.bind(this)}>Clubs around me</div>
        <div className="menu-option-logout" onClick={this.logOut.bind(this)}>Log Out</div>
      </div>
    );
  }
});

module.exports = Header;
