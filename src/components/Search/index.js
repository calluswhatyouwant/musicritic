import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import SpotifyWebApi from '../../spotify';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: ''
        };

        this.searchItems = this.searchItems.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    searchItems(event) {
        this.context.history.push('/search/' + this.state.query);
    }

    handleChange(event) {
        this.setState({ ...this.state, query: event.target.value });
    }

    render() {
        return (
            <div className="input-group mb-3">
                <SearchInput query={this.state.query} handleChange={this.handleChange}  />
                <div className="input-group-append">
                    <SearchButton searchItems={this.searchItems} />
                </div>
            </div>
        );
    }
}

const SearchInput = ({query, handleChange}) => (
    <input className="form-control" type="text" placeholder="Search" value={query} onChange={handleChange} />       
);

const SearchButton = ({searchItems}) => (
    <button className="btn btn-outline-secondary" onClick={() => searchItems()}>
        <i className="fa fa-search" />
    </button>
);

export default Search;
