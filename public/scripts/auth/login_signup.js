var React = require('react');
var ReactDOM = require('react-dom');

var LogIn = require('../../components/login.js');
var SignUp = require('../../components/signup.js');

//on log in page
function handleSignUpLinkClick(){
  // TODO: Try to NOT have it one long line. Ideally you wouldn't exceed 80 characters in length
  // NOTE: Good length:
  ReactDOM.render(
    <SignUp onClick={handleLogInLinkClick} onSignUp={handleSignUp}/>,
    document.getElementById('main-form')
  );
}

//on sign up page
function handleLogInLinkClick(){
  // NOTE: Bad length:
  ReactDOM.render(<LogIn onClick={handleSignUpLinkClick} onLogIn={handleLogIn}/>, document.getElementById('main-form'));
}

//redirect to sign up path
function handleSignUp(event){
  event.preventDefault();

  var userData = $(".form-signup").serialize();
  $.post("/signup", userData, function(response){
    // TODO: remove console logs from production environment
    console.log(response);
    window.location.replace("/profile");
  });
}

//redirect to log in path
function handleLogIn(event){
  event.preventDefault();
  var userData = $(".form-login").serialize();
  // TODO: remove console logs from production environment
  console.log("USER: "+ userData);
  $.post("/login", userData, function(response){
    // TODO: remove console logs from production environment
    console.log(response);
    window.location.replace("/profile");
  });
}

ReactDOM.render(<LogIn onClick={handleSignUpLinkClick} onLogIn={handleLogIn}/>, document.getElementById('main-form'));
