import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import About from './About';
import api from './api/posts';
import './App.css';
import EditPost from './EditPost';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import Nav from './Nav';
import NewPost from './NewPost';
import NotFound from './NotFound';
import PostPage from './PostPage';

import useAxiosFetch from './hooks/useAxiosFetch';
import useWindowSize from './hooks/useWindowSize';

const App = () => {
    const [posts, setPosts] = useState([]);

    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const { width } = useWindowSize();
    const { data, fetchError, isLoading } = useAxiosFetch(
        'http://localhost:3500/posts'
    );

    useEffect(() => {
        setPosts(data);
    }, [data]);

    useEffect(() => {
        const filteredPosts = posts.filter(
            (post) =>
                post.body.toLowerCase().includes(search) ||
                post.title.toLowerCase().includes(search)
        );

        setSearchResults(filteredPosts.reverse());
    }, [search, posts]);

    const navigate = useNavigate();

    const handelDelete = async (id) => {
        try {
            await api.delete(`/posts/${id}`);
            const newPosts = posts.filter((post) => post.id !== id);
            setPosts(newPosts);
            navigate('/', { replace: true });
        } catch (error) {
            console.log('error:::::: ', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dateTime = format(new Date(), 'MMMM dd, yyyy pp');
        if (postTitle && postBody) {
            const newPost = {
                id: uuid(),
                title: postTitle,
                body: postBody,
                dateTime,
            };

            try {
                const response = await api.post('/posts', newPost);
                setPosts([...posts, response.data]);
                setPostTitle('');
                setPostBody('');
                navigate('/', { replace: true });
            } catch (error) {
                console.log('error:::::: ', error);
            }
        }
    };

    const handleEdit = async (id) => {
        if (editTitle && editBody) {
            try {
                const dateTime = format(new Date(), 'MMMM dd, yyyy pp');
                const editPost = {
                    id,
                    title: editTitle,
                    body: editBody,
                    dateTime,
                };

                const updatedPost = await api.put(`/posts/${id}`, editPost);

                setPosts(
                    posts.map((post) =>
                        post.id === id ? { ...updatedPost.data } : post
                    )
                );
                setEditTitle('');
                setEditBody('');
                navigate('/', { replace: true });
            } catch (error) {
                console.log('error:::::: ', error.message);
            }
        }
    };

    return (
        <div className='App'>
            <Header title='React Js Blog' width={width} />
            <Nav search={search} setSearch={setSearch} />
            <Routes>
                <Route
                    path='/'
                    element={
                        <Home
                            isLoading={isLoading}
                            fetchError={fetchError}
                            posts={searchResults}
                        />
                    }
                />
                <Route path='/about' element={<About />} />
                <Route
                    path='/post'
                    element={
                        <NewPost
                            postTitle={postTitle}
                            postBody={postBody}
                            setPostTitle={setPostTitle}
                            setPostBody={setPostBody}
                            handleSubmit={handleSubmit}
                        />
                    }
                />
                <Route
                    path='/post/:id'
                    element={
                        <PostPage posts={posts} handelDelete={handelDelete} />
                    }
                />
                <Route
                    path='/edit/:id'
                    element={
                        <EditPost
                            posts={posts}
                            handleEdit={handleEdit}
                            editTitle={editTitle}
                            editBody={editBody}
                            setEditTitle={setEditTitle}
                            setEditBody={setEditBody}
                        />
                    }
                />
                <Route path='*' element={<NotFound />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;
