import React from 'react';
import { FaLaptop, FaMobileAlt, FaTabletAlt } from 'react-icons/fa';
import { useData } from './context/DataContext';

const Header = ({ title }) => {
    const { width } = useData();

    return (
        <header className='Header'>
            <h1>{title}</h1>
            {width < 768 ? (
                <FaMobileAlt />
            ) : width < 992 ? (
                <FaTabletAlt />
            ) : (
                <FaLaptop />
            )}
        </header>
    );
};

export default Header;
