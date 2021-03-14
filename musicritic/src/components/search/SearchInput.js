/* @flow */
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import './SearchInput.css';

type Props = {
    handleSearch: (query: string) => void,
};

const SearchInput = ({ handleSearch }: Props) => {
    const intl = useIntl();
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
            placeholder={intl.formatMessage({ id: 'search' })}
            value={query}
            className="search-input"
            onChange={handleChange}
            onKeyPress={handleKeyPress}
        />
    );
};

export default SearchInput;
