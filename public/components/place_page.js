import React from 'react';
var Header = require('./header.js');
var PlaceInfo = require('./place_info.js');
var AdditionalNavigation = require('./additional_nav.js');
var SorryMessage = require('./sorry_message.js');
var PostInfo = require('./post_info.js');
var NewCommentForm = require('./new_comment.js');

var PlacePage = React.createClass({
  getInitialState(){
    return {
      gotPlace: false,
      is_open_now: false,
      place: null,
      newComment: false
    }
  },

  componentDidMount(){
    var arrUrl = window.location.href.split("/");
    var id =  arrUrl[arrUrl.length - 1];
    var thisComponent = this;
    $.get("/getplace", {id: id}).then(function(place){
      console.log(place);
      place.jsonBody.hours[0].is_open_now ? thisComponent.setState({place: place, gotPlace: true, is_open_now: true}) : thisComponent.setState({place: place, gotPlace: true});
    });
  },

  leaveComment(){
    this.setState({newComment: true});
  },

  render(){
    return (
      <div>
        <Header/>
        <div className="empty-div"></div>
        <AdditionalNavigation/>
        {this.state.gotPlace && <PlaceInfo place={this.state.place.jsonBody}/>}
        {this.state.newComment && <NewCommentForm leaveComment={this.leaveComment}/>}
        {<PostInfo/> || <SorryMessage/>}
      </div>
    );
  }
});

module.exports = PlacePage;
//TODO put infront of PostInfo this.state.is_open_now &&
