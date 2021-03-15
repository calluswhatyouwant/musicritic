/* @flow */

import React from 'react';
import Palette from 'react-palette';
import { backgroundColor, lightenTextColor } from './palette-util';

type Props = {
    children: any,
    imageUrl: string,
};

const style = (palette: any) => ({
    background: backgroundColor(palette),
    color: lightenTextColor(palette.lightMuted),
});

const CustomPalette = ({ children, imageUrl }: Props) => (
    <Palette image={imageUrl}>
        {palette => React.cloneElement(children, { style: style(palette) })}
    </Palette>
);

export default CustomPalette;
