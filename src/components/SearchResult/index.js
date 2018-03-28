import React from 'react';
import PropTypes, {instanceOf} from 'prop-types';

import {Track} from '../../spotify/models';

import './style.css';

const SearchResultList = ({results}) => {
    const searchResultItem = (result, key) => <SearchResultItem key={key} result={result}/>;
    const searchResultList = results.map((result, index) => searchResultItem(result, index));
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                <th scope="col">Image</th>
                <th scope="col">Track</th>
                <th scope="col">Song</th>
                </tr>
            </thead>
            <tbody>
                {searchResultList}
            </tbody>
        </table>
    );
}

const SearchResultItem = ({result}) => (
    <tr>
      <td className="align-middle"><img src={result.album.imageUrl} /></td>
      <td className="align-middle">{result.name}</td>
      <td className="align-middle">{result.stringArtists}</td>
    </tr>
);

SearchResultList.propTypes = {
    results: PropTypes.arrayOf(instanceOf(Track)).isRequired
};

SearchResultItem.propTypes = {
    result: PropTypes.object.isRequired
};

export default SearchResultList;
