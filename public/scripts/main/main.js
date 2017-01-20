var React = require('react');
var ReactDOM = require('react-dom');
var UserProfile = require('../../components/user_profile.js');

$.get('/getUser', function(user){
  console.log(user);
  ReactDOM.render(<UserProfile user={user}/>, document.getElementById('profile'));
});
