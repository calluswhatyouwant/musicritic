import React, {Component} from 'react';

import SpotifyWebApi from '../../spotify';
import SearchResultList from '../../components/SearchResult';

import { Track } from '../../spotify/models';

class SearchResultsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: []
        }
        this.spotifyWebApi = new SpotifyWebApi();
    }

    componentWillMount() {
        const query = this.props.match.params.query;
        this.spotifyWebApi.searchItems(query).then(results => {
            const searchResults = results.map(result => new Track(result));
            this.setState({ results: searchResults });
        })
    }

    render() {
        console.log(this.state.results)
        return (
            <div className="container">
                <SearchResultList results={this.state.results} />
            </div>
        );
    }
}

export default SearchResultsPage;
