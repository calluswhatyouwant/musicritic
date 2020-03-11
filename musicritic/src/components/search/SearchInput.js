/* @flow */
import React, { useState } from 'react';

import './SearchInput.css';

const SearchInput = ({ handleSearch }) => {
    const [query, setQuery] = useState('');

    const handleChange = event => {
        setQuery(event.target.value);
    };

    const handleKeyPress = event => {
        if (event.key === 'Enter') {
            handleSearch(query);
        }
    };

    return (
        <input
            type="text"
            placeholder="Search..."
            value={query}
            className="search-input"
            onChange={handleChange}
            onKeyPress={handleKeyPress}
        />
    );
};

export default SearchInput;
