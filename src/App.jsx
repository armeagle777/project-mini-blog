import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';

import About from './About';
import EditPost from './EditPost';

import Home from './Home';
import NewPost from './NewPost';
import NotFound from './NotFound';
import PostPage from './PostPage';

import { DataProvider } from './context/DataContext';
import Layout from './Layout';

const App = () => {
    return (
        <DataProvider>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path='post'>
                        <Route index element={<NewPost />} />
                        <Route path=':id' element={<PostPage />} />
                    </Route>
                    <Route path='about' element={<About />} />
                    <Route path='edit/:id' element={<EditPost />} />
                    <Route path='*' element={<NotFound />} />
                </Route>
            </Routes>
        </DataProvider>
    );
};

export default App;
