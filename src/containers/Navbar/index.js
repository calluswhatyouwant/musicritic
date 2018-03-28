import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import Search from '../../components/Search';

class Navbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Route path='/' component={Search} />
            </div>
        );
    }
}

export default Navbar;
