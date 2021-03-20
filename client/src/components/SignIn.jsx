import React, { Component } from 'react';
import '../StyleSheet/Form.css';
import axios from 'axios';

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        };
        this.handleForm = this.handleForm.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    handleForm(e) {
        this.setState({
            [e.target.id]: e.target.files ? e.target.files[0] : e.target.value,
        });
    }

    signUp(e) {
        e.preventDefault();

        const data = new FormData();
        data.append("username", this.state.username);
        data.append("password", this.state.password);

        const url = "http://localhost:5000/api/user-login";

        axios
        .post(url, data)
        .then((response) => {
            console.log(response);
            localStorage.setItem("sid", response.data.token);
            localStorage.setItem("pp", response.data.profile_pic);
        })
        .catch((error) => {
            console.log(error);
        });
    };
    render() {
        return (
            <div className="Form__container">
                <form className="Form">
                    <br></br>
                    <label>Username</label>
                    <input onChange={this.handleForm} type="text" placeholder="username" id="username" />
                    <label>Password</label>
                    <input onChange={this.handleForm} type="password" name="" id="password" />
                    <button onClick={this.signUp}>Sign In</button>
                </form>
            </div>
        )
    }
}
