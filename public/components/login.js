import React from 'react'

var LogIn = React.createClass({
  render(){
    return (
      <div>
        <form className="form login form-login">

          <div className="form__field">
            <label for="login__username"><span className="hidden">Username</span></label>

            <input className="form__input" id="login__username"  type="text" name="email" placeholder="Email"/>
          </div>

          <div className="form__field">
            <label for="login__password"><span className="hidden">Password</span></label>
            <input className="form__input" id="login__password" type="password" name="password" placeholder="Password"/>
          </div>

          <div className="form__field">
            <input type="submit" value="Log In" onClick={this.props.onLogIn}/>
          </div>

        </form>

        <p className="text--center">Not a member? <a href="#" id="sign-up-link" onClick={this.props.onClick}>Sign up now</a></p>
      </div>
    )
  }
});

module.exports = LogIn;


// <svg className="icon"></svg action="https://httpbin.org" method="POST" c
// <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use> placeholder="Email"
// <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#lock"> placeholder="Password" required

// <svg className="icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="assets/images/icons.svg#arrow-right"></use></svg>
