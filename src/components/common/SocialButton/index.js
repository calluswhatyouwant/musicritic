/* @flow */

import React from 'react';

import './social-button.css';

type Props = {
    name: string,
    onClick?: () => void,
};

const SocialButton = ({ name, onClick }: Props) => (
    <button
      className={`btn btn-block btn-social btn-${name} text-center`}
      onClick={onClick}
    >
        <span className={`fa fa-${name}`} />
    </button>
);

SocialButton.defaultProps = {
    onClick: () => {},
};

export default SocialButton;
