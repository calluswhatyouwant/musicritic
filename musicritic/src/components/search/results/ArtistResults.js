/* @flow */

import React, { Component } from 'react';
import { Artist } from 'spotify-web-sdk';

import ArtistCard from '../../common/artist/ArtistCard';

import './Results.css';

type Props = {
    results: Array<Artist>,
};

type State = {
    artists: Array<Artist>,
};

class ArtistResult extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            artists: this.props.results,
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        this.setState({
            artists: nextProps.results,
        });
    }

    render() {
        const listResults = this.state.artists.map(artist => (
            <div key={artist.id} className="col-3 result">
                <ArtistCard artist={artist} />
            </div>
        ));
        return <div className="row">{listResults}</div>;
    }
}

export default ArtistResult;
