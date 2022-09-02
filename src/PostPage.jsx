import React from 'react';
import { Link, useParams } from 'react-router-dom';

const PostPage = ({ posts, handelDelete }) => {
    const { id } = useParams();
    const post = posts.find((post) => post.id === id);

    return (
        <main className='PostPage'>
            <article className='post'>
                {post ? (
                    <>
                        <h2>{post.title}</h2>
                        <p className='postDate'>{post.dateTime}</p>
                        <p className='post.body'>{post.body}</p>
                        <button onClick={() => handelDelete(post.id)}>
                            Delete Post
                        </button>
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
            </article>
        </main>
    );
};

export default PostPage;
