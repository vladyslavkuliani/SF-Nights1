var React = require('react');

var BrowsePlacesLink = React.createClass({
  goToPlaces(){
    window.location.replace('/places');
  },

  render(){
      return <a href="#" onClick={this.goToPlaces}>Browse Places</a>
  }
});

module.exports = BrowsePlacesLink;
