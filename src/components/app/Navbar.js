import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

import SearchInput from '../search/SearchInput';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);        
    }

    handleSearch(query) {
        this.props.history.push('/search/tracks/' + query);
    }

    render() {
        return (
            <SearchInput handleSearch={this.handleSearch} />
        );
    }
}

export default withRouter(Navbar);
