import React, {Component} from 'react';

import SpotifyWebApi from '../../spotify';
import SearchResultTable from '../../components/SearchResult';

class SearchResultsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            results: []
        }
        this.spotifyWebApi = new SpotifyWebApi();
    }

    componentDidMount() {
        const query = this.props.match.params.query;
        this.updateResults(query);
    }
    
    componentWillReceiveProps(nextProps) {
        const receivedQuery = nextProps.match.params.query;
        const currentQuery = this.state.query;

        if (receivedQuery !== currentQuery) {
            this.setState({ query: receivedQuery });
            this.updateResults(receivedQuery);
        }
    }

    updateResults(query) {
        this.spotifyWebApi.searchItems(query).then(response => {
            const tracks = response.tracks.items;
            console.log(tracks);
            this.setState({ ...this.state, results: tracks });
        });
    }

    render() {
        return (
            <div className="container">
                <SearchResultTable results={this.state.results} />
            </div>
        );
    }
}

export default SearchResultsPage;
