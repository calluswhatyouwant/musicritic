import React from 'react';

import './social-button.css';

const SocialButton = ({ name, url }) => (
    <a href={url} className={`btn btn-block btn-social btn-${name} text-center`}>
        <span className={`fa fa-${name}`} />
    </a>
);

export default SocialButton;
