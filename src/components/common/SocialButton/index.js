/* @flow */

import React from 'react';

import './social-button.css';

type Props = {
    name: string,
    url?: string,
    content?: string,
};

const SocialButton = ({ name, url, content }: Props) => (
    <a
      className={`btn btn-block btn-social btn-${name} text-center`}
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
