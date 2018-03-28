import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const LoginButton = ({urlToAuth}) => (
    <a href={urlToAuth} className="btn btn-lg spotify-button">
        <i className="fa fa-spotify"/>
    </a>
);

LoginButton.propTypes = {
    urlToAuth: PropTypes.string.isRequired
}

export default LoginButton;
