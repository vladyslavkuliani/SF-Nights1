import React from 'react';

var UserProfile = React.createClass({
  goToPlaces(){
    window.location.replace('/places');
  },

  render(){
    return (
      <div className="user-profile">
        <p>{this.props.user.name}</p>
        <p>{this.props.user.dob}</p>
        <a href="#" onClick={this.goToPlaces}>Browse Places</a>
      </div>
    );
  }
});

module.exports = UserProfile;
