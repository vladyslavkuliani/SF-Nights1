import React from 'react'

var SignUp = React.createClass({
  render(){
    return (
      <div>
      <form className="form login form-signup">

        <div className="form__field">
          <label for="signup__username"><span className="hidden">Full name</span></label>

          <input className="form__input" id="signup__username"  type="text" name="name" placeholder="Full Name"/>
        </div>

        <div className="form__field">
          <label for="signup__email"><span className="hidden">Email</span></label>
          <input className="form__input" id="signup__email" type="text" name="email" placeholder="email@example.com"/>
        </div>

        <div className="form__field">
          <label for="signup__dob"><span className="hidden">dob</span></label>
          <input className="form__input" id="signup__dob" type="date" name="dob" placeholder="Date of birth"/>
        </div>

        <div className="form__field">
          <label for="signup__password"><span className="hidden">Password</span></label>
          <input className="form__input" id="signup__password" type="password" name="password" placeholder="Password"/>
        </div>

        <div className="form__field">
          <label for="signup__password_confirm"><span className="hidden">Password</span></label>
          <input className="form__input" id="signup__password_confirm" type="password" name="passwordConfirmation" placeholder="Confirm Password"/>
        </div>

        <div className="form__field">
          <input type="submit" value="Sign Up" onClick={this.props.onSignUp}/>
        </div>

      </form>
      <p className="text--center">Go to <a href="#" id="logIn-link" onClick={this.props.onClick}>LogIn page</a></p>
      </div>
    )
  }
});

module.exports = SignUp;
