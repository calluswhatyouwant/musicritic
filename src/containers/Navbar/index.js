import React, {Component} from 'react';

import Search from '../../components/Search';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ''
        }
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
