/* @flow */

import React, { Component } from 'react';
import { Album, AlbumSimplified, ArtistSimplified } from 'spotify-web-sdk';
import _ from 'lodash';

import { getAlbum, getArtistAlbums } from '../../api/SpotifyWebAPI';

import AlbumSummary from './AlbumSummary';
import AlbumPageContent from './AlbumPageContent';

import './AlbumPage.css';

type Props = {
    match: any,
};

type State = {
    album: Album,
    artistAlbums: AlbumSimplified[],
    mainArtist: ArtistSimplified,
};

class AlbumPage extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            album: {},
            artistAlbums: [],
            mainArtist: {},
        };
    }

    componentDidMount() {
        this.updateAlbumData(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps: Props) {
        const oldId = this.props.match.params.id;
        const newId = nextProps.match.params.id;
        if (oldId !== newId) {
            this.updateAlbumData(newId);
        }
    }

    updateAlbumData(id: string) {
        getAlbum(id).then((album) => {
            const mainArtist = album.artists[0];
            this.setState({ album, mainArtist });
            getArtistAlbums(mainArtist.id, ['album']).then(artistAlbums =>
                this.setState({
                    artistAlbums: _.uniqBy(artistAlbums.items, 'name'),
                }));
        });
    }

    render() {
        const { album, artistAlbums, mainArtist } = this.state;
        return (
            <div className="album-page border container shadow-sm p-4 my-3">
                <div className="row">
                    <AlbumSummary
                      album={album}
                      artistAlbums={artistAlbums}
                      mainArtist={mainArtist}
                    />
                    <AlbumPageContent album={album} />
                </div>
            </div>
        );
    }
}

export default AlbumPage;
