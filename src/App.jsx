import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import About from './About';
import './App.css';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import Nav from './Nav';
import NewPost from './NewPost';
import NotFound from './NotFound';
import PostPage from './PostPage';

const App = () => {
    const [posts, setPosts] = useState([
        {
            id: '1',
            title: 'Բարև կյանք',
            dateTime: 'July 01, 2021 11:17:36 AM',
            body: 'asdadsa asdasd!',
        },
        {
            id: '2',
            title: 'Ո՞նց ես արև',
            dateTime: 'July 01, 2021 11:17:36 AM',
            body: 'asdadsa asdasd asdasdasd asda asdasdasd asdasdasdasd asd  asdasd asdasd',
        },
        {
            id: '3',
            title: 'Ի՞նչ կա չկա',
            dateTime: 'July 01, 2021 11:17:36 AM',
            body: 'asdadsa asdasd asdasdasd asda asdasdasd asdasdasdasd asd  asdasd asdasd',
        },
        {
            id: '4',
            title: 'Սովորական',
            dateTime: 'July 01, 2021 11:17:36 AM',
            body: 'asdadsa asdasd asdasdasd asda asdasdasd asdasdasdasd asd  asdasd asdasd',
        },
    ]);

    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');

    useEffect(() => {
        const filteredPosts = posts.filter(
            (post) =>
                post.body.toLocaleLowerCase().includes(search) ||
                post.title.toLocaleLowerCase().includes(search)
        );

        setSearchResults(filteredPosts.reverse());
    }, [search, posts]);

    const navigate = useNavigate();
    const handelDelete = (id) => {
        const newPosts = posts.filter((post) => post.id !== id);
        setPosts(newPosts);
        navigate('/', { replace: true });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dateTime = format(new Date(), 'MMMM dd, yyyy pp');
        if (postTitle && postBody) {
            const newPost = {
                id: uuid(),
                title: postTitle,
                body: postBody,
                dateTime,
            };

            setPosts([...posts, newPost]);
            setPostTitle('');
            setPostBody('');
            navigate('/', { replace: true });
        }
    };

    return (
        <div className='App'>
            <Header title='React Js Blog' />
            <Nav search={search} setSearch={setSearch} />
            <Routes>
                <Route path='/' element={<Home posts={searchResults} />} />
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
                <Route path='*' element={<NotFound />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;
