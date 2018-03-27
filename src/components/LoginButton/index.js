import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const LoginButton = ({url}) => (
    <a href={url} className="btn spotify-button">
        <i className="fa fa-spotify"/>
    </a>
);

LoginButton.propTypes = {
    url: PropTypes.string.isRequired
}

export default LoginButton;
