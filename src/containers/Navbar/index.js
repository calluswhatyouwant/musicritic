import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';

import Search from '../../components/Search';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);        
    }

    handleSearch(query) {
        this.props.history.push('/search/track/' + query);
    }

    render() {
        return (
            <div>
                <Search handleSearch={this.handleSearch} />
            </div>
        );
    }
}

export default withRouter(Navbar);
