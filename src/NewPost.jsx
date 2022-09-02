import React from 'react';
import { useData } from './context/DataContext';

const NewPost = () => {
    const { postTitle, setPostTitle, postBody, setPostBody, handleSubmit } =
        useData();
    const canSubmit = postTitle && postBody;
    return (
        <main className='NewPost'>
            <h2>New Post</h2>
            <form className='newPostForm' onSubmit={handleSubmit}>
                <label htmlFor='postTitle'>Title:</label>
                <input
                    id='postTitle'
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    required
                    type='text'
                />
                <label htmlFor='postBody'>Post:</label>
                <textarea
                    required
                    id='postBody'
                    value={postBody}
                    onChange={(e) => setPostBody(e.target.value)}
                ></textarea>
                <button disabled={!canSubmit}>Submit</button>
            </form>
        </main>
    );
};

export default NewPost;
