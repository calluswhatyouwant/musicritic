/* @flow */

import React from 'react';
import { useParams } from 'react-router-dom';

import SearchResult from './SearchResult';
import SearchResultsNav from './SearchResultsNav';
import { search } from '../../api/SpotifyWebAPI';
import { usePromise } from '../../utils/hooks';

const SearchResultsPage = () => {
    const { query } = useParams();
    const [results, error, loading] = usePromise(search(query), {}, [query]);

    return (
        <div>
            <SearchResultsNav query={query} />
            {loading && !error ? null : <SearchResult results={results} />}
        </div>
    );
};

export default SearchResultsPage;
