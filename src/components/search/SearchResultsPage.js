/* @flow */

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import SearchResult from './SearchResult';
import { search } from '../../spotify';

type Props = {
    match: any;
};

type State = {
    results: any,
};

class SearchResultsPage extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = { results: {} };
    }

    componentDidMount() {
        this.updateResults(this.props.match.params.query);
    }

    componentWillReceiveProps(nextProps: Props) {
        const oldQuery = this.props.match.params.query;
        const newQuery = nextProps.match.params.query;
        if (oldQuery !== newQuery) {
            this.updateResults(newQuery);
        }
    }

    updateResults(query) {
        search(query).then((results) => {
            this.setState(() => ({
                results,
            }));
        });
    }

    render() {
        return (
            <div>
                <SearchResultsNav query={this.props.match.params.query} />
                {this.state.results.albums ?
                    <SearchResult results={this.state.results} /> : null}

            </div>
        );
    }
}

type SearchResultsNavProps = {
    query: string,
}

const SearchResultsNav = ({ query }: Props) => (
    <ul className="nav justify-content-center">
        <li className="nav-item">
            <NavLink className="nav-link" to={`/search/tracks/${query}`}>
                Tracks
            </NavLink>
        </li>
        <li className="nav-item">
            <NavLink className="nav-link" to={`/search/albums/${query}`}>
                Albums
            </NavLink>
        </li>
        <li className="nav-item">
            <NavLink className="nav-link" to={`/search/artists/${query}`}>
                Artists
            </NavLink>
        </li>
        <li className="nav-item">
            <NavLink className="nav-link" to={`/search/playlists/${query}`}>
                Playlists
            </NavLink>
        </li>
    </ul>
);

export default SearchResultsPage;
