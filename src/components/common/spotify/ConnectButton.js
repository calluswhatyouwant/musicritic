import React from 'react';
import PropTypes from 'prop-types';

import './spotify.css';

const ConnectButton = ({urlToAuth}) => (
    <a href={urlToAuth} className="btn btn-lg spotify-button">
        <i className="fa fa-spotify"/>
    </a>
);

ConnectButton.propTypes = {
    urlToAuth: PropTypes.string.isRequired
}

export default ConnectButton;
