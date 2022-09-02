import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useData } from './context/DataContext';

const PostPage = () => {
    const { posts, handelDelete } = useData();
    const { id } = useParams();
    const post = posts.find((post) => post.id === id);
    const navigate = useNavigate();

    return (
        <main className='PostPage'>
            <article className='post'>
                {post ? (
                    <>
                        <h2>{post.title}</h2>
                        <p className='postDate'>{post.dateTime}</p>
                        <p className='post.body'>{post.body}</p>
                        <Link to={`/edit/${post.id}`}>
                            <button className='editButton'>Edit post</button>
                        </Link>
                        <button
                            className='deleteButton'
                            onClick={() => handelDelete(post.id)}
                        >
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
