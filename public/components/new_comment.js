var React = require('react');

var NewCommentForm = React.createClass({
  getInitialState(){
    return {
      rerender: true
    }
  },

  forceRerender(){
    this.setState({rerender: !this.state.rerender});
  },

  render(){
    return (
      <div className="card col-md-8 col-md-offset-2 new-comment">
      <form className="form feedback-form">
        <div className="card-header">
          <div className="form-group col-md-6">
            <select className="form-control" id="select-rating" name="rating">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <div className="col-md-6">
            <h4>Select your rating.</h4>
          </div>
        </div>
        <div className="card-block">
          <div className="form-group">
            <textarea className="form-control" id="exampleTextarea" rows="3" name="comment" isRequired></textarea>
          </div>
        </div>
        <a href="#" className="btn btn-primary" onClick={this.props.handlePost}>Post comment</a>
        </form>
      </div>
    );
  }
});

module.exports = NewCommentForm;
