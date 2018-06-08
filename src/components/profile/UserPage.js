/* @flow */

import React, { Component } from 'react';

import SongCarousel from '../common/SongCarousel/SongCarousel';
import { Track } from '../../spotify/models';
import { getRecentlyPlayedTracks } from '../../spotify';
import SocialButton from './../common/SocialButton';

type Props = {

};

type State = {
    tracks: Array<Track>,
};

class UserPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            tracks: [],
        };
    }

    componentWillMount() {
        getRecentlyPlayedTracks().then((results) => {
            const tracks = results.map(result => new Track(result.track));
            this.setState({ tracks });
        });
    }

    render() {
        if (localStorage.getItem('token')) {
            return <SongCarousel tracks={this.state.tracks} />;
        }
        return <SpotifyConnect />;
    }
}

const SpotifyConnect = () => {
    const serverBaseUri = process.env.SERVER_BASE_URI || '';

    return (
        <div className="row justify-content-center">
            <div className="col-sm-12 col-md-7 col-lg-5">
                <h1 className="text-center">Connect to Spotify:</h1>
                <SocialButton
                  name="spotify"
                  url={`${serverBaseUri}/auth/login`}
                />
            </div>
        </div>
    );
};

export default UserPage;
