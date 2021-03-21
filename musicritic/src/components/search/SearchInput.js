/* @flow */
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import './SearchInput.css';

type Props = {
    handleSearch: (query: string, type: string) => void,
};

const SearchInput = ({ handleSearch }: Props) => {
    const intl = useIntl();
    const [query, setQuery] = useState('');
    const [type, setType] = useState('tracks');

    const handleInputChange = event => {
        setQuery(event.target.value);
    };

    const handleSelectChange = event => {
        setType(event.target.value);
    };

    const handleKeyPress = event => {
        if (event.key === 'Enter' && query.trim() !== '') {
            handleSearch(query, type);
        }
    };

    useEffect(() => {
        if (query.trim() !== '') {
            handleSearch(query, type);
        }
    }, [query, type]);

    return (
        <div className="search-input-container">
            <input
                type="text"
                placeholder={intl.formatMessage({ id: 'search' })}
                value={query}
                className="search-input"
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
            />
            <select
                onChange={handleSelectChange}
                className="search-input-select">
                <option value="tracks">
                    {intl.formatMessage({ id: 'tracks' })}
                </option>
                <option value="albums">
                    {intl.formatMessage({ id: 'albums' })}
                </option>
                <option value="artists">
                    {intl.formatMessage({ id: 'artists' })}
                </option>
            </select>
        </div>
    );
};

export default SearchInput;
