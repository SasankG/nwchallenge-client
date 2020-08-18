import React, { Component } from 'react'

export default class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {

            firstName: '',
            lastName: '',
            email: '',

        }
    }

    handleProfile = (e) => {

        e.preventDefault();

        const token = JSON.parse(localStorage.getItem('token')).token

        fetch("/api/profile", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: token
            })
        })
            .then((res) => res.json())
            .then((data) => {

                this.setState({

                    firstName: data.profile.firstName,
                    lastName: data.profile.lastName,
                    email: data.profile.email,

                })

            })

    }

    render() {

        let { firstName, lastName, email } = this.state;

        console.log(lastName)

        let profileInformation = <div></div>;

        if (firstName != '' && lastName != '' && email != '') {
            profileInformation =
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Profile information</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Name: {firstName}</h6>
                        <p class="card-text">LastName: {lastName}</p>
                        <p class="card-text">email: {email}</p>
                    </div>
                </div>
        }

        return (
            <div>
                <div>
                    <form>
                        <h3>Welcome to the Home page!</h3>
                        <h5>If you have made it here, your data has successfully been encrypted as a JWT token and stored locally!</h5>
                        <p> If you would like to retreive your profile information click the button bellow!</p>
                        <p> This application will send your token to the API to retreive your profile information</p>

                        <button type="submit" className="btn btn-primary btn-block" onClick={(e) => this.handleProfile(e)}>Fetch my Profile!</button>

                    </form>

                    {profileInformation}

                </div>
            </div>
        )
    }
}
