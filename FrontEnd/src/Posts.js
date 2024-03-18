import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./css/post.css"
import EditPost from "./EditPost"; 

export default function Posts() {
    const params = useParams();
    const [apiData, setApiData] = useState([]);
    const [loading, isLoading] = useState(true);
    const navigate = useNavigate();
    const [delete_error, SetError] = useState('');

    const [edit, setEdit] = useState(false);
    useEffect(() => {
        if (localStorage.getItem("jwtToken")) {
            (async () => {
                try {
                    console.log(params.postId);
                    const response = await axios.get(`http://localhost:3001/posts/${params.postId}`, {
                        headers: {
                            authorization: "Bearer " + localStorage.getItem("jwtToken")
                        }
                    });
                    setApiData(response.data);
                    console.log(response);
                    isLoading(false);
                }
                catch (error) {
                    console.log(error);
                }
            })()
        }
        else {
            navigate('/login');
        }
    }, [])

    if (loading) {
        return (
            <h1>Loading...</h1>
        )
    }

    const go_back = () => {
        navigate('/posts');
    }

    const delete_button = async () => {
        try {
            await axios.delete(`http://localhost:3001/posts/${params.postId}`, {
                headers: {
                    authorization: "Bearer " + localStorage.getItem("jwtToken")
                }
            });
            navigate('/posts');
        }
        catch (error) {
            SetError("*You are not the owner of this post!!!");
        }
    }


    const edit_button = async () => {
        if (!edit) {
            setEdit(true);
        }
    }

    return (
        <div className="post-container">
            <button className="back-button" onClick={go_back}>Go Back</button>
            <div className="post-buttons">
                <button className="post-edit" onClick={edit_button}>Edit</button>
                <button className="post-delete" onClick={delete_button}>Delete</button>
            </div>
            <div className="post-errors">
                <h3 className="delete-error">{delete_error}</h3>
            </div> 
            <div className="post-title-container">
                <h2 className="post-title">“{apiData.title}”</h2> 
            </div>
            <div className="post-content">
                <p>Content :- </p>
                <EditPost content={apiData.content} flag={edit} ></EditPost> 
            </div>
        </div>
    );
}  

