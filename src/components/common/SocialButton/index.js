import React from 'react';

import './social-button.css';

const SocialButton = ({name, onClick}) => (
    <a className={`btn btn-block btn-social btn-${name} text-center`} onClick={onClick}>
        <span className={`fa fa-${name}`} />
    </a>
);

export default SocialButton;