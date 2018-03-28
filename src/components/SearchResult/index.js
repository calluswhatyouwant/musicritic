import React from 'react';
import PropTypes, {instanceOf} from 'prop-types';

import {Track} from '../../spotify/models';

import './style.css';

const SearchResultTable = ({results}) => {
    return (
        <table className="table table-striped">
            <SearchResultTableHead elements={['Track', 'Artist']} />
            <SearchResultTableBody results={results} />
        </table>
    );
}

const SearchResultTableBody = ({results}) => {
    const row = (result, key) => {
        const imageUrl = result.album.images[0].url;
        const name = result.name;
        const artist = result.artists[0].name;
        const textInfo = [name, artist];

        return <SearchResultTableRow key={key} imageUrl={imageUrl} textInfo={textInfo} />
    }
    
    const rows = results.map((result, index) => row(result, index));
    
    return <tbody>{rows}</tbody>;
}

const SearchResultTableHead = ({elements}) => {
    const header = (name, key) => <SearchResultTableHeader name={name} key={key}/> ;
    const headers = elements.map((name, index) => header(name, index));

    return (
        <thead>
            <tr>
                <th width="5%" scope="col"></th>
                {headers}
            </tr>
        </thead>
    );
}

const SearchResultTableHeader = ({name}) => <th scope="col">{name}</th>;

const SearchResultTableRow = ({imageUrl, textInfo}) => {
    const cells = textInfo.map((data, index) =>
        <SearchResultTableCell key={index} data={data} />);

    return (
        <tr>
            <td className="align-middle"><img src={imageUrl} /></td>
            {cells}
        </tr>
    )
};

const SearchResultTableCell = ({data}) => <td className="align-middle">{data}</td>;

export default SearchResultTable;
