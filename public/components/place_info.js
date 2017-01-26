var React = require('react');

var PlaceInfo = React.createClass({
  getInitialState(){
    return {
      post: null,
      gotPost: false
    }
  },

  componentDidMount(){
    var thisComponent = this;
    this.props.getPostData(thisComponent, this.props.place.id, false);
  },

  render(){
    var place = this.props.place;
    var post = this.props.post;
    return (
      <div className="place-info col-md-8 col-md-offset-2">
        <img src={place.image_url} className="place-info-img" />
        <h3>{place.name}</h3>
        {this.props.isOpenNow && this.state.gotPost && <span className="rating-tonight">Rating tonight: <strong>{this.state.post.rating}</strong> | <strong>{this.state.post.votes.length}</strong> votes</span>}
        {this.props.isOpenNow && <div className="comment-btn"><button className="btn m-b-xs w-xs btn-dark" onClick={()=>{this.props.leaveComment()}}>Comment</button></div>}
      </div>
    );
  }
});

module.exports = PlaceInfo;
// <span>Rating tonight:   | <strong>{post.votes.length}</strong> votes</span>
