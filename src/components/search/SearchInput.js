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
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ query: event.target.value });
    }

    handleKeyPress(event) {
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
