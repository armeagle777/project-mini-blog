import React from 'react';
import Feed from './Feed';

const Home = ({ posts, isLoading, fetchError }) => {
    return (
        <main className='Home'>
            {isLoading && <p className='statusMsg'>Loading posts...</p>}
            {!isLoading && fetchError && (
                <p style={{ color: 'red' }} className='statusMsg'>
                    {fetchError}
                </p>
            )}
            {!isLoading &&
                !fetchError &&
                (posts.length ? (
                    <Feed posts={posts} />
                ) : (
                    <p className='statusMsg' style={{ marginTop: '2rem' }}>
                        No posts to display
                    </p>
                ))}
        </main>
    );
};

export default Home;
