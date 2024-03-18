import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./css/viewPosts.css";

export default function Viewport() {
    const [apiData, setApiData] = useState([]);
    const [loading, isLoading] = useState(true);
    const [apiError, setApiError] = useState(false);
    const [ErrorType, setErrorType] = useState("");
    const navigate = useNavigate();
  

    useEffect(() => {
        if (localStorage.getItem("jwtToken")) {
            (async () => {
                try {
                    const response = await axios.get("http://localhost:3001/posts", {
                        headers: {
                            authorization: "Bearer " + localStorage.getItem("jwtToken")
                        }
                    });
                    setApiData(response.data);
                    console.log(response.data);
                    isLoading(false);
                }
                catch (error) {
                    setErrorType(error.message);
                    setApiError(true);
                }
            })()
        }
        else {
            navigate('/login');
        }
    },[]);

    const create = () => {
        navigate('/create_post');
    }

    const post_content = (res) => {
        navigate(`/posts/${res}`);
    }
    const logout = () => {
        localStorage.removeItem('jwtToken');
        window.location.reload();
    }
    const about = () => {
        navigate('/about');
    }

 

    const displayData = apiData.map((data) => <p className="post-data" onClick={() => {
        post_content(data._id);
    }} key={data.id}><span style={{color: "rgb(27, 27, 169)", fontWeight:"600", fontSize:"36px"}}>“ {data.title} ”</span>  <br/> <span style={{color: "rgb(215, 57, 0)", fontSize:"14px", textDecoration:"underline"}}>Posted By → {data.username}</span> </p>);

    if (apiError) {
        return (
            <div>
                <h1>{ErrorType}</h1>
            </div>
        )
    }
    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <div className="all-post-container">
            <div className="all-post-buttons">
            <button className="about-button" onClick={about}>About</button>
            <button className="logout-button" onClick={logout}>Logout</button>
            </div>
            <h1 className="all-post-heading">All Posts </h1>
            <button className="post-create-button" onClick={create}>Create your blog </button>
            <p className="all-posts">{displayData}</p>
        </div>
    );
}
