import React from 'react';
import PropTypes, { instanceOf } from 'prop-types';

import './search.css';

const SearchResultsTable = ({headers, results, type}) => (
    <table className="table table-striped">
        <SearchResultsTableHead headElements={headers} />
        <SearchResultsTableBody results={results} />
    </table>
);

const SearchResultsTableHead = ({headElements}) => {
    const header = (name, key) => <SearchResultsTableHeader name={name} key={key} />;
    const headers = headElements.map((name, index) => header(name, index + 1));
    const imageHeader = <SearchResultsTableHeader key={0} width="1%" />;
    headers.unshift(imageHeader);

    return (
        <thead>
            <tr>{headers}</tr>
        </thead>
    );
}

const SearchResultsTableHeader = ({name, width}) => (
    <th scope="col" width={width || "50%"}>{name}</th>
);

const SearchResultsTableBody = ({results}) => {
    const row = (result, key) => {
        const type = result.type;
        const [imageUrl, ...textInfo] = result.values;
        return <SearchResultsTableRow key={key} imageUrl={imageUrl} textInfo={textInfo} />;
    };
    const rows = results.map((result, index) => row(result, index));

    return <tbody>{rows}</tbody>;
}

const SearchResultsTableRow = ({imageUrl, textInfo}) => {
    const cells = textInfo.map((data, index) =>
        <SearchResultsTableCell key={index + 1} data={data} />);
    const imageCell = <SearchResultsTableCell key={0} data={imageUrl} image />;
    cells.unshift(imageCell);

    return <tr>{cells}</tr>;
};

const SearchResultsTableCell = ({data, image}) => {
    if (image) data = <img className="img-search" src={data} />;
    return <td className="align-middle">{data}</td>;
};

export default SearchResultsTable;
