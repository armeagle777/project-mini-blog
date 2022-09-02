import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useData } from './context/DataContext';

const EditPost = () => {
    const {
        posts,
        handleEdit,
        editTitle,
        editBody,
        setEditTitle,
        setEditBody,
    } = useData();
    const { id } = useParams();
    const post = posts.find((post) => post.id === id);
    const canSubmit = editTitle && editBody;
    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [setEditTitle, setEditBody, post]);

    return (
        <main className='NewPost'>
            {post ? (
                <>
                    <h2>Edit Post</h2>
                    <form
                        className='newPostForm'
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <label htmlFor='postTitle'>Title:</label>
                        <input
                            id='postTitle'
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            required
                            type='text'
                        />
                        <label htmlFor='postBody'>Post:</label>
                        <textarea
                            required
                            id='postBody'
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                        ></textarea>
                        <button
                            onClick={() => handleEdit(post.id)}
                            disabled={!canSubmit}
                        >
                            Submit
                        </button>
                    </form>
                </>
            ) : (
                <>
                    <h2>Post Not found</h2>
                    <p>Well, that's disappointing</p>
                    <p>
                        <Link to='/'>Visit Our Homepage</Link>
                    </p>
                </>
            )}
        </main>
    );
};

export default EditPost;
