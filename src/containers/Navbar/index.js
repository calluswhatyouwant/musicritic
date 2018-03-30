import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';

import Search from '../../components/Search';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.redirectTo = this.redirectTo.bind(this);        
    }

    redirectTo(url) {
        this.props.history.push(url);
    }

    render() {
        return (
            <div>
                <Search redirectTo={this.redirectTo} />
            </div>
        );
    }
}

export default withRouter(Navbar);
