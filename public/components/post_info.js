var React = require('react');

var PostInfo = React.createClass({
  getInitialState(){
    return {
      comments: [],
      gotComments: false
    }
  },

  componentDidMount(){
    var thisComponent = this;
    var tonightsComments = [];
    $.get("/getpost", {clubId: this.props.place.id}).then(function(post){
      post.comments.forEach(function(commentId){
        $.get('/comment', {id: commentId}).then((com)=>{
          console.log("COMMENT!!!");
          console.log(com);
          tonightsComments.push(com);
          if(tonightsComments.length === post.comments.length){
            thisComponent.setState({comments: tonightsComments, gotComments: true});
          }
        });
      });
    });
  },

  render(){
    var allComments = this.state.comments.map((comment)=>{
        return (
        <div>
          <a className="pull-left thumb-sm">
            <img src={comment.userProfilePic} className="img-circle"/>
          </a>
          <div className="m-l-xxl m-b">
            <div>
              <a href><strong>{comment.userName}</strong></a>
              <span className="text-muted text-xs block m-t-xs">
                24 minutes ago
              </span>
            </div>
            <div className="m-t-sm">{comment.content}</div>
          </div>
        </div>
      );
    });

    return (
      <div className="col-md-8 col-md-offset-2 post-info">
        {((this.state.comments.length>0) && allComments) || <div><h1>Be the first one to comment!</h1></div> }
      </div>
    );
  }
});

module.exports = PostInfo;
