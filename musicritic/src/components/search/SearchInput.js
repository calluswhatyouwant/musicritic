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
        <div className="search-input-container text-dark">
            <input
                type="text"
                placeholder={intl.formatMessage({ id: 'search' })}
                value={query}
                className="search-input"
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
            />
            <SearchTypeSelect type={type} setType={setType} intl={intl} />
        </div>
    );
};

const SearchTypeSelect = ({ type, setType, intl }) => (
    <div className="btn-group">
        <button
            type="button"
            className="dropdown-toggle search-input-select"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">
            {intl.formatMessage({ id: type })}
        </button>
        <div className="dropdown-menu dropdown-menu-right">
            <button
                onClick={() => setType('tracks')}
                className="dropdown-item"
                type="button">
                {intl.formatMessage({ id: 'tracks' })}
            </button>
            <button
                onClick={() => setType('albums')}
                className="dropdown-item"
                type="button">
                {intl.formatMessage({ id: 'albums' })}
            </button>
            <button
                onClick={() => setType('artists')}
                className="dropdown-item"
                type="button">
                {intl.formatMessage({ id: 'artists' })}
            </button>
        </div>
    </div>
);

export default SearchInput;
