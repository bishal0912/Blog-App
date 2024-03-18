import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./css/createPost.css"

export default function CreatePost() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("jwtToken")) {
            navigate('/login');
        }
    }, [])
 

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleTitle = (event) => {
        setTitle(event.target.value);
    }

    const handleContent = (event) => {
        setContent(event.target.value);
    }

    const handleForm = async (event) => {
        try {
            event.preventDefault();
            const res = await axios.post("http://localhost:3001/posts", {
                title: title,
                content: content
            },
                {
                    headers: {
                        authorization: "Bearer " + localStorage.getItem("jwtToken")
                    }
                })

            if (res.status === 201) {
                navigate('/posts');
            }
        }
        catch (error) {
            return (
                <h1>{error}</h1>
            )
        }
    }

    const go_back = () => {
        navigate('/posts');
    }

    return (
        <div className="create-post-container">
            <button className="back-button" onClick={go_back}>Go Back</button>
            <h1>Create your blog here </h1>
            <form onSubmit={handleForm}>
                <input className="title-input" type='text' value={title} onChange={handleTitle} placeholder="Title"></input><br></br>
                <textarea className="content-input" rows="4" cols="20" value={content} onChange={handleContent} placeholder="Content"></textarea><br></br>
                <button className="post-button">Post</button>
            </form>
        </div>
    );
}