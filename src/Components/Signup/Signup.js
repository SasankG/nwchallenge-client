// Signup form
import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'


export default class Signup extends Component {

  constructor(props) {
    super(props)

    this.state = {

      email: "",
      password: "",
      firstName: "",
      lastName: "",
      redirect: false,
    }

  }

  // DONE: handle form data by adding it to state

  // TODO: create a fetch request to the api /signup route
  //  - send the state which will contain form data to the api
  handleSubmit = (e) => {

    e.preventDefault();

    let isIncomplete = true;

    for (var key in this.state) {
      if (this.state[key] == '' && key != 'redirect') {
        isIncomplete = true;
        break;
      } else {
        isIncomplete = false;
      }
    }

    if (isIncomplete) {
      alert("Please make sure all fields are complete!")
    } else {

      fetch("/api/signup", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          password: this.state.password,
        })
      })
        .then((res) => res.json())
        .then((data) => {

          if (data.status == 200) {
            alert("Signup Successful!", "Redirecting to Log in")
          }

          this.setState({ redirect: true })

        })
        .catch(err => {
          throw (err)
        })

    }

  }

  updateState = (e, data) => {

    e.preventDefault();

    if (data == 'fName') {
      this.setState({ firstName: e.target.value })
    }
    if (data == 'lName') {
      this.setState({ lastName: e.target.value })
    }
    if (data == 'email') {
      this.setState({ email: e.target.value })
    }
    if (data == 'pWord') {
      this.setState({ password: e.target.value })
    }

  }

  render() {

    const { redirect } = this.state;

    if (redirect === true) {
      return <Redirect to='/sign-in' />
    } else {
      return (
        <div>
          <div>
            <form>
              <h3>Sign Up</h3>

              <div className="form-group">
                <label>First name</label>
                <input type="text" className="form-control" placeholder="First name" onChange={(e) => this.updateState(e, 'fName')} required />
              </div>

              <div className="form-group">
                <label>Last name</label>
                <input type="text" className="form-control" placeholder="Last name" onChange={(e) => this.updateState(e, 'lName')} required />
              </div>

              <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" placeholder="Enter email" onChange={(e) => this.updateState(e, 'email')} required />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" onChange={(e) => this.updateState(e, 'pWord')} required />
              </div>

              <button type="submit" className="btn btn-primary btn-block" onClick={(e) => this.handleSubmit(e)}>Sign Up</button>
              <p className="forgot-password text-right">
                Already registered?<Link to = '/sign-in'> sign in</Link>
              </p>
            </form>
          </div>
        </div>
      )
    }
  }
}
