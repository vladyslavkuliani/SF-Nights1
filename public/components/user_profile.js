import React from 'react';
var BrowsePlacesLink = require('./browse_places_link.js');

var UserProfile = React.createClass({
  getInitialState(){
    return {
      gotLocationData: false
    }
  },

  logOut(){
    window.location.replace('/logout');
  },

  render(){
    const Fn = this
    $.get('/position', (pos)=>{
      if(!pos.lat){
        navigator.geolocation.getCurrentPosition(function(position){
          $.get('/setcurrentlocation', {lat:position.coords.latitude, lng:position.coords.longitude});
          Fn.setState({gotLocationData: true});
        });
      }
      else{
        Fn.setState({gotLocationData: true});
      }
    });

    return (
      <div className="user-profile">
        <p>{this.props.user.name}</p>
        <p>{this.props.user.dob}</p>
        {this.state.gotLocationData && <BrowsePlacesLink/>}
        <button onClick={this.logOut}>Log Out</button>
      </div>
    );
  }
});

module.exports = UserProfile;
