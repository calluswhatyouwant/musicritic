/* @flow */

import React, { Component } from 'react';

import SearchResult from './SearchResult';
import SearchResultsNav from './SearchResultsNav';
import { search } from '../../api/SpotifyWebAPI';

type Props = {
    match: any;
};

type State = {
    results: any,
};

class SearchResultsPage extends Component<Props, State> {
    constructor(props: Props) {
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

    updateResults(query: string) {
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

export default SearchResultsPage;
