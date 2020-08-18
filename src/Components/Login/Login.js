import React, { Component } from 'react'
import { Redirect } from 'react-router'

export default class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {

            email: '',
            password: '',
            redirect: false,

        }

    }

    handleSubmit = (e) => {

        e.preventDefault();

        fetch("/api/login", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            })
        })
        .then((res) => res.json())
        .then((token) => {

            if (token.auth === false) {
                alert("Failed to log in: Please check to see if email or password is correct!")
            } else {

                localStorage.setItem('token', JSON.stringify(token));

                alert("Login Successful!")

                this.setState({ redirect: true })

            }

        })

    }

    updateState = (e, data) => {

        if (data == 'email') {
            this.setState({ email: e.target.value })
        }
        if (data == 'password') {
            this.setState({ password: e.target.value })
        }

    }


    render() {

        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to='/home' />
        } else {
            return (
                <form>
                    <h3>Sign In</h3>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" onChange={(e) => this.updateState(e, 'email')} required />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" onChange={(e) => this.updateState(e, 'password')} required />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block" onClick={(e) => this.handleSubmit(e)}>Submit</button>
                </form>
            )
        }
    }
}

