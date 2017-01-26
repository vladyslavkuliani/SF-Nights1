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
      place: null,
      is_open_now: false,
      newComment: false
    }
  },

  componentDidMount(){
    var arrUrl = window.location.href.split("/");
    var id =  arrUrl[arrUrl.length - 1];
    var thisComponent = this;
    $.get("/getplace", {id: id}).then(function(place){
      console.log("place next:");
      console.log(place.jsonBody.hours[0]);
      place.jsonBody.hours[0].is_open_now ? thisComponent.setState({place: place, gotPlace: true, is_open_now: true}) : thisComponent.setState({place: place, gotPlace: true});
    });
  },

  leaveComment(){
    this.setState({newComment: true});
  },

  handleOnPostComment(){
    var thisComponent = this;
    var data = $(".feedback-form").serialize();
    data += "&id=" + this.state.place.jsonBody.id;
    $.post('/leavecomment', data, function(response){
      thisComponent.setState({newComment: false});
    });
  },
  // {rating: data.rating, comment: data.comment, id: this.state.place.jsonBody.id}

  getPostData(thisComponent, placeId, commentsNeeded){
    $.get("/getpost", {clubId: placeId}).then(function(post){
      console.log(post);
      if(commentsNeeded){
        $.get("/comments", {post: post}).then(function(comments){
          console.log(comments);
          thisComponent.setState({comments: comments, gotComments: true});
        });
      }
      else{
        thisComponent.setState({post: post, gotPost: true});
      }
    });
  },

  render(){
    return (
      <div>
        <Header/>
        <div className="empty-div"></div>
        <AdditionalNavigation/>
        {this.state.gotPlace && <PlaceInfo place={this.state.place.jsonBody} leaveComment={this.leaveComment.bind(this)} getPostData={this.getPostData.bind(this)}/>}
        {this.state.newComment && <NewCommentForm place={this.state.place.jsonBody} handlePost={this.handleOnPostComment.bind(this)}/>}
        {(this.state.is_open_now && <PostInfo place={this.state.place.jsonBody}/>) || <SorryMessage/>}
      </div>
    );
  }
});

module.exports = PlacePage;
//TODO put infront of PostInfo this.state.is_open_now &&
