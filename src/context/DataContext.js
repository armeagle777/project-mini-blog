import { format } from 'date-fns';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import api from '../api/posts';
import useAxiosFetch from '../hooks/useAxiosFetch';
import useWindowSize from '../hooks/useWindowSize';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
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
        <DataContext.Provider
            value={{
                width,
                search,
                setSearch,
                isLoading,
                fetchError,
                searchResults,
                postTitle,
                postBody,
                setPostTitle,
                setPostBody,
                handleSubmit,
                posts,
                handelDelete,
                handleEdit,
                editTitle,
                editBody,
                setEditTitle,
                setEditBody,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
