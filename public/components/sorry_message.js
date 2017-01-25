var React = require('react');

var SorryMessage = React.createClass({
  render(){
    return (
      <div className="col-md-8 col-md-offset-2 sorry-message">
        <h1>Sorry, but the place is currently closed</h1>
        <img src="http://i.imgur.com/kIlwm8I.png" className="lock-img"/>
      </div>
    );
  }
});

module.exports = SorryMessage;
