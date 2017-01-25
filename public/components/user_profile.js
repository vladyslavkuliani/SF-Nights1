import React from 'react';
var BrowsePlacesLink = require('./browse_places_link.js');
var Header = require('./header.js');

var UserProfile = React.createClass({
  getInitialState(){
    return {
      gotLocationData: false
    }
  },

  render(){
    const Fn = this
    // $.get('/position', (pos)=>{
    //   if(!pos.lat){
    //     console.log("HERE!!!!");
    //     navigator.geolocation.getCurrentPosition(function(position){
    //       console.log(position);
    //       $.get('/setcurrentlocation', {lat:position.coords.latitude, lng:position.coords.longitude});
    //       Fn.setState({gotLocationData: true});
    //     });
    //   }
    //   else{
    //     Fn.setState({gotLocationData: true});
    //   }
    // });

    return (
      <div>
        <Header/>
        <div className="user-profile">
          <p>{this.props.user.name}</p>
          <p>{this.props.user.dob}</p>
          {this.state.gotLocationData && <BrowsePlacesLink/>}
        </div>
      </div>
    );
  }
});

module.exports = UserProfile;
