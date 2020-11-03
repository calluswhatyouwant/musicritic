/* @flow */

import * as spotify from 'spotify-web-sdk';
import { userApi } from './UserAPI';

const refreshTokenFunction = async (): Promise<string> => {
    const { data } = await userApi.post('/auth/refresh', {
        refresh_token: refreshToken,
    });
    localStorage.setItem('spotifyToken', data.token);
    return data.token;
};

export const init = (spotifyToken?: string, spotifyRefreshToken?: string) => {
    const token = spotifyToken || localStorage.getItem('spotifyToken') || '';
    const refreshToken = spotifyRefreshToken || localStorage.getItem('spotifyRefresh') || '';
    spotify.init({ token, refreshToken, refreshTokenFunction });
};

init();

export const getRecentlyPlayedTracks = () =>
    spotify
        .getCurrentUserRecentlyPlayedTracks({ limit: 50 })
        .then((page) => page.items);

export const getTopPlayedTracks = async () =>
    spotify
        .getCurrentUserTopTracks({ limit: 50, time_range: 'short_term' })
        .then((page) => page.items);

export const search = async (query: string) =>
    spotify.search(query, 'album,artist,playlist,track', { limit: 50 });

export const getTrack = async (id: string) => spotify.getTrack(id);

export const getAudioFeaturesForTrack = async (id: string) =>
    spotify.getAudioFeaturesForTrack(id);

export const getCurrentUserCurrentlyPlayingTrack = async () =>
    spotify.getCurrentUserCurrentlyPlayingTrack();

export const getAlbum = async (id: string) => spotify.getAlbum(id);

// TODO Deal with multiple discs
export const getNextAlbumTrack = async (
    id: string,
    discNumber: number,
    trackNumber: number
) => {
    if (discNumber === 1) {
        const { items } = await spotify.getAlbumTracks(id, {
            offset: trackNumber,
            limit: 1,
        });
        if (items.length) {
            return items[0];
        }
        return {};
    }
    return {};
};

export const getPrevAlbumTrack = async (
    id: string,
    discNumber: number,
    trackNumber: number
) => {
    if (discNumber === 1 && trackNumber > 1) {
        const { items } = await spotify.getAlbumTracks(id, {
            offset: trackNumber - 2,
            limit: 1,
        });
        if (items.length) {
            return items[0];
        }
        return {};
    }
    return {};
};

export const getArtistAlbums = async (id: string, includeGroups: string[]) =>
    spotify.getArtistAlbums(id, { includeGroups });
