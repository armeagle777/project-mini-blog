import React from 'react';
import { useData } from './context/DataContext';
import Feed from './Feed';

const Home = () => {
    const { isLoading, fetchError, searchResults } = useData();
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
                (searchResults.length ? (
                    <Feed posts={searchResults} />
                ) : (
                    <p className='statusMsg' style={{ marginTop: '2rem' }}>
                        No posts to display
                    </p>
                ))}
        </main>
    );
};

export default Home;
