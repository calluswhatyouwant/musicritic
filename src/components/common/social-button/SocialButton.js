/* @flow */

import React from 'react';

import './SocialButton.css';

type Props = {
    name: string,
    url?: string,
    content?: string,
};

const SocialButton = ({ name, url, content }: Props) => (
    <a
      className={`btn btn-block btn-social btn-${name}
        ${content ? 'fit-content badge-pill mx-auto d-block' : ''}`}
      href={url}
    >
        {content} <span className={`fa fa-${name}`} />
    </a>
);

SocialButton.defaultProps = {
    url: '',
    content: '',
};

export default SocialButton;
