import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './css/login.css';

export default function Login() {
    const navigate = useNavigate();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const handleForm = async (event) => {
        try {
            event.preventDefault();
            const res = await axios.post("http://localhost:3001/login", {
                username: username,
                password: password
            });

            if (res.status === 200) {
                localStorage.setItem("jwtToken", res.data.token);
                navigate('/posts');
            }
        }
        catch (error) {
            setLoginError("*Incorrect Credentials");
        }
    } 

    const handleUsername = (event) => {
        console.log(event);
        setUserName(event.target.value);
        setLoginError("");
    }

    const handlePassword = (event) => {
        console.log(event);
        setPassword(event.target.value);
        setLoginError("");
    }

    const register_button = () => {
        navigate('/register');
    }


    return (
        <div className="login-container">
            <h1 className="login-heading">User Login</h1>
            <form onSubmit={handleForm}>
                <input className="login-input" type='text' value={username} onChange={handleUsername} placeholder="Username"></input><br></br>
                <input className="login-input" type='password' value={password} onChange={handlePassword} placeholder="Password"></input><br></br>
                <h4 className="login-error">{loginError}</h4>
                <button className="login-button">Login</button>
            </form>

            <p>Don't have an account? <a className="login-registration-button" onClick={register_button}>Register</a></p>
        </div>
    );
}