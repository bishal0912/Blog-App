import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import "./css/register.css"

export default function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsername = (event) => {
        setUsername(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }
 
    const handleForm = async (event) => {
        try {
            event.preventDefault();
            const res = await axios.post("http://localhost:3001/register", {
                username: username,
                password: password
            })
            if (res.status === 201) {
                navigate('/login');
            }
        }
        catch (error) {
            return (
                <h1>{error}</h1>
            )
        }
    }

    const login_button = () => {
        navigate('/login');
    }



    return (
        <div className="registration-container">
            <h1 className="registration-heading">Registration</h1>
            <form onSubmit={handleForm}>
                <input className="registration-input" type='text' value={username} onChange={handleUsername} placeholder="Username"></input><br></br>
                <input className="registration-input" type='password' value={password} onChange={handlePassword} placeholder="Password"></input><br></br>
                <button className="registration-button">Register</button>
            </form>
            <p>Already have an account? <a className="registration-login-button" onClick={login_button}>Login</a></p>
        </div>
    );
}