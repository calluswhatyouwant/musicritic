/* eslint-disable no-bitwise */

const WHITE = '#FFFFFF';
const BLACK = '#000000';

type Palette = {
    darkMuted: string | null,
    darkVibrant: string | null,
    muted: string | null,
    vibrant: string | null,
    lightMuted: string | null,
    lightVibrant: string | null,
};

export const backgroundColor = (palette: Palette) => {
    const {
        darkMuted,
        darkVibrant,
        muted,
        vibrant,
        lightMuted,
        lightVibrant,
    } = palette;

    return (
        darkVibrant ||
        lightVibrant ||
        vibrant ||
        darkMuted ||
        muted ||
        lightMuted ||
        BLACK
    );
};

export const lightenTextColor = (rgbColor: string) => {
    if (!rgbColor) return WHITE;
    const FACTOR = 0.5;
    const color = rgbColor.slice(1);
    const num = parseInt(color, 16);

    const currentR = num >> 16;
    const currentB = (num >> 8) & 0x00ff;
    const currentG = num & 0x0000ff;

    const r = Math.max(currentR + (255 - currentR) * FACTOR, 0);
    const b = Math.max(currentB + (255 - currentB) * FACTOR, 0);
    const g = Math.max(currentG + (255 - currentG) * FACTOR, 0);

    return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
};
