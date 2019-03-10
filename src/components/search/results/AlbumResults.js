/* @flow */

import React, { Component } from 'react';
import { AlbumSimplified } from 'spotify-web-sdk';

import AlbumCard from '../../common/album/AlbumCard';

import './Results.css';

type Props = {
    history: any,
    results: AlbumSimplified[],
};

type State = {
    albums: AlbumSimplified[],
};

class AlbumResult extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            albums: this.props.results,
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        this.setState({
            albums: nextProps.results,
        });
    }

    handleClick = (album: AlbumSimplified) => {
        this.props.history.push(`/album/${album.id}/`);
    }

    render() {
        const listResults = this.state.albums.map(album => (
            <div key={album.id} className="col-3 result">
                <AlbumCard
                  album={album}
                  handleClick={() => this.handleClick(album)}
                />
            </div>
        ));
        return <div className="row">{listResults}</div>;
    }
}

export default AlbumResult;
