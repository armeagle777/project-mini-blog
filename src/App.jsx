import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';

import About from './About';
import EditPost from './EditPost';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import Nav from './Nav';
import NewPost from './NewPost';
import NotFound from './NotFound';
import PostPage from './PostPage';

import { DataProvider } from './context/DataContext';

const App = () => {
    return (
        <div className='App'>
            <DataProvider>
                <Header title='React Js Blog' />
                <Nav />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/post' element={<NewPost />} />
                    <Route path='/post/:id' element={<PostPage />} />
                    <Route path='/edit/:id' element={<EditPost />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
                <Footer />
            </DataProvider>
        </div>
    );
};

export default App;
