import React, { Component } from 'react';
import '../StyleSheet/Form.css';
import axios from 'axios'

export default class SignUp extends Component {
    constructor(props){
        super(props)
        this.state={
            username:'',
            password:'',
            vPassword:'',
            image:null
        };
        this.handleForm = this.handleForm.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    handleForm(e){
        this.setState({
            [e.target.id]:e.target.files ? e.target.files[0] : e.target.value,
        })
    }
    signUp(e){
        e.preventDefault();
        // console.log(this.state);
        const data = new FormData();
        data.append("username", this.state.username);
        data.append("password", this.state.password);
        data.append("verifiedPassword", this.state.vPassword);
        data.append("profileImage", this.state.image);

        const url = "http://localhost:5000/api/user-register";
        
        axios
        .post(url, data)
        .then((response) => {
            alert(response.data.msg);
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
                    <label>Verify Password</label>
                    <input onChange={this.handleForm} type="password" id="vPassword" />
                    <label>Profile Picture</label>
                    <input onChange={this.handleForm} type="file" id="image" />
                    <button onClick={this.signUp}>Sign Up</button>
                </form>
            </div>
        )
    }
}
