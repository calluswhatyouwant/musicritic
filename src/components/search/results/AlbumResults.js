/* @flow */

import React, { Component } from 'react';

import AlbumCard from '../../common/album/AlbumCard';
import { Album } from '../../../spotify/models';

import './results.css';

type Props = {
    results: Array<any>;
};

type State = {
    albums: Array<Album>;
};

class AlbumResult extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            albums: this.props.results.map(album => new Album(album)),
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        this.setState({
            albums: nextProps.results.map(album => new Album(album)),
        });
    }

    render() {
        const listResults = this.state.albums.map(album => (
            <div key={album.id} className="col-3 result">
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
