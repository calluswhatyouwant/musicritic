/* @flow */

import React, { Component } from 'react';

import ArtistCard from '../../common/artist/ArtistCard';
import { Artist } from '../../../spotify/models';

import './results.css';

type Props = {
    results: Array<any>;
};

type State = {
    artists: Array<Artist>;
};

class ArtistResult extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            artists: this.props.results.map(artist => new Artist(artist)),
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        this.setState({
            artists: nextProps.results.map(artist => new Artist(artist)),
        });
    }

    render() {
        const listResults = this.state.artists.map((artist, index) => (
            <div key={index} className="col-3 result">
                <ArtistCard artist={artist} />
            </div>
        ));
        return (
            <div className="row">
                {listResults}
            </div>
        );
    }
}

export default ArtistResult;
