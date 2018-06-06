import React, { Component } from 'react';

import AlbumCard from '../../common/album/AlbumCard';
import { Album } from '../../../spotify/models';

import './results.css';

class AlbumResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            albums: this.props.results.map(album => new Album(album)),
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ albums: nextProps.results.map(album => new Album(album)) });
    }

    render() {
        const listResults = this.state.albums.map((album, index) => (
            <div key={index} className="col-3 result">
                <AlbumCard album={album} />
            </div>
        ));
        return (
            <div className="row">
                {listResults}
            </div>
        );
    }
}

export default AlbumResult;
