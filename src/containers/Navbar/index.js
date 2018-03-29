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
                <Search />
            </div>
        );
    }
}

export default Navbar;
