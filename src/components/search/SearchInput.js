/* @flow */

import React, { Component } from 'react';

import './search.css';

class SearchInput extends Component {
    constructor(props) {
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
