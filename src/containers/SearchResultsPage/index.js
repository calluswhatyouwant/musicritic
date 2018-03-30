import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import SearchResultsTable from '../../components/SearchResult';
import SpotifyWebApi from '../../spotify';

class SearchResultsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: []
        }
        this.spotifyWebApi = new SpotifyWebApi();

        this.redirectSearch = this.redirectSearch.bind(this);
    }

    componentDidMount() {
        const query = this.props.match.params.query;
        const type = this.props.match.params.type;
        this.updateResults(query, type);
    }
    
    componentWillReceiveProps(nextProps) {
        const oldQuery = this.props.match.params.query;
        const newQuery = nextProps.match.params.query;
        const oldType = this.props.match.params.type;
        const newType = nextProps.match.params.type;
        
        if (oldQuery != newQuery || oldType != newType) {
            this.updateResults(newQuery, newType);
        }
    }

    updateResults(query, type) {
        this.spotifyWebApi.search(query, type).then(results => {
            this.setState({ results: results });
        });
    }

    redirectSearch(type) {
        const query = this.props.match.params.query;
        this.props.history.push(`/search/${type}/${query}`);
    }

    get headers() {
        const type = this.props.match.params.type;
        const headers = ['Name'];
        
        switch(type) {
            case 'album': case 'track':
                headers.push('Artist');
                break;
            case 'playlist':
                headers.push('Owner');
                break;
            default:
                break;
        }

        return headers;
    }

    get types() {
        return ['track', 'album', 'artist', 'playlist'];
    }

    render() {
        return (
            <div className="container">
                <SearchResultsPageButtonGroup types={this.types} redirectSearch={this.redirectSearch} />
                <SearchResultsTable headers={this.headers} results={this.state.results} />
            </div>
        );
    }
}

const SearchResultsPageButtonGroup = ({types, redirectSearch}) => {
    const buttons = types.map((type, index) =>
        <SearchResultsPageButton
            key={index}
            name={type}
            onClick={() => redirectSearch(type)}
        />
    );

    return <div className="btn-group d-flex" role="group">{buttons}</div>
}

const SearchResultsPageButton = ({name, onClick}) => (
    <button type="button" onClick={onClick} className="btn btn-secondary w-100">
        {name}
    </button>
);

export default withRouter(SearchResultsPage);
