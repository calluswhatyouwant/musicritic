/* @flow */

import React, { Component } from 'react';

import './search.css';

type Props = {
    handleSearch: string => void,
};

type State = {
    query: string,
};

class SearchInput extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { query: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChange = (event: any) => {
        this.setState({ query: event.target.value });
    }

    handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            this.props.handleSearch(this.state.query);
        }
    }

    render() {
        return (
            <input
              type="text"
              placeholder="Search..."
              value={this.state.query}
              className="search-input"
              onChange={this.handleChange}
              onKeyPress={this.handleKeyPress}
            />
        );
    }
}

export default SearchInput;
