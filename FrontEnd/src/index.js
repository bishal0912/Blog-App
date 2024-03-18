import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './Login.js';
import Posts from './Posts.js';
import ViewPosts from './ViewPosts.js';
import Register from './Register.js';
import CreatePost from './CreatePost.js';
import About from './About.js';

const router = createBrowserRouter([
    {
        path: '/',
        element: <ViewPosts></ViewPosts>,
        errorElement: <h1>Page Not Found</h1>
    },
    {
        path: '/login',
        element: <Login></Login>,
    },
    {
        path: '/posts/:postId',
        element: <Posts></Posts>
    },
    {
        path: '/posts',
        element: <ViewPosts></ViewPosts>
    },
    {
        path: "/register",
        element: <Register></Register>
    },
    {
        path: "/create_post",
        element: <CreatePost></CreatePost>
    },
    {
        path: "/about",
        element: <About></About>
    }
])



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>

        <RouterProvider router={router}></RouterProvider>

    </React.StrictMode>

);


