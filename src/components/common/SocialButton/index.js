/* @flow */

import React from 'react';

import './social-button.css';

const SocialButton = ({ name, url }) => (
    <a href={url} className={`btn btn-block btn-social btn-${name}`}>
        <span className={`fa fa-${name} text-center`} />
    </a>
);

export default SocialButton;
