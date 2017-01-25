import React from 'react';
var Header = require('./header.js');

var PlacePage = React.createClass({
  getInitialState(){
    return {
      gotPlace: false,
      place: null
    }
  },

  componentDidMount(){
    var arrUrl = window.location.href.split("/");
    var id =  arrUrl[arrUrl.length - 1];
    var thisComponent = this;
    $.get("/getplace", {id: id}).then(function(place){
      thisComponent.setState({place: place, gotPlace: true});
    });
  },

  render(){
    return (
      <div>
        <Header/>
        {this.state.gotPlace && <h1>{this.state.place.jsonBody.name}</h1> }
      </div>
    );
  }
});

module.exports = PlacePage;
