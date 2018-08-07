/* @flow */

import React from 'react';

import './social-button.css';

type Props = {
    name: string,
    url?: string,
};

const SocialButton = ({ name, url }: Props) => (
    <a
      className={`btn btn-block btn-social btn-${name} text-center`}
      href={url}
    >
        <span className={`fa fa-${name}`} />
    </a>
);

SocialButton.defaultProps = {
    url: '',
};

export default SocialButton;
