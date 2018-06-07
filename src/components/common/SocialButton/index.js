/* @flow */

import React from 'react';

import './social-button.css';

type Props = {
    name: string,
    url: string,
};

const SocialButton = ({ name, url }: Props) => (
    <a href={url} className={`btn btn-block btn-social btn-${name}`}>
        <span className={`fa fa-${name} text-center`} />
    </a>
);

export default SocialButton;
