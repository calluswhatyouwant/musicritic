import React, { Component } from 'react';

import ArtistCard from '../../common/artist/ArtistCard';
import { Artist } from '../../../spotify/models';

import './results.css';

class ArtistResult extends Component {
    constructor(props) {
        super(props);      
        this.state = {
            artists: this.props.results.map(artist => {
                return new Artist(artist)
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({artists: nextProps.results.map(artist => {
            return new Artist(artist)
        })});
    }
    
    render() {
        const listResults = this.state.artists.map((artist, index) => (
            <div key={index} className="col-3 result">
                <ArtistCard artist={artist}/>
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