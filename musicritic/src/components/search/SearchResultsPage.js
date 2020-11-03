/* @flow */

import React from 'react';
import { useParams } from 'react-router-dom';

import SearchResult from './SearchResult';
import SearchResultsNav from './SearchResultsNav';
import Loading from '../common/loading/Loading';
import { search } from '../../api/SpotifyWebAPI';
import { usePromise } from '../../utils/hooks';

const SearchResultsPage = () => {
    const { query } = useParams();
    const [results,, loading] = usePromise(search(query), {}, [query]);

    return (
        <div>
            <SearchResultsNav query={query} />
            {loading ? <Loading /> : <SearchResult results={results} />}
        </div>
    );
};

export default SearchResultsPage;
