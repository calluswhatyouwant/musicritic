import React, {Component} from 'react';

import SpotifyWebApi from '../../spotify';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: ''
        };

        this.searchTracks = this.searchTracks.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ query: event.target.value });
    }

    searchTracks() {
        this.props.handleSearch(this.state.query);
    }

    render() {
        return (
            <div className="input-group mb-3">
                <SearchInput query={this.state.query} handleChange={this.handleChange}
                    searchTracks={this.searchTracks} />
                <div className="input-group-append">
                    <SearchButton searchTracks={this.searchTracks} />
                </div>
            </div>
        );
    }
}

const SearchInput = ({query, handleChange, searchTracks}) => {
    const handleSearch = (event) => {
        if (event.key == 'Enter') searchTracks();
    }

    return (
        <input className="form-control" type="text" placeholder="Search"
            value={query} onChange={handleChange} onKeyPress={handleSearch} />       
    )
};

const SearchButton = ({searchTracks}) => {
    return (
        <button className="btn btn-outline-secondary" onClick={() => searchTracks()}>
            <i className="fa fa-search" />
        </button>
    );
};

export default Search;
