import React from 'react';

import './style.css';

const LoginButton = () => (
    <a href="http://localhost:5000/auth/login" className="btn spotify-button">
        <i className="fa fa-spotify"/>
    </a>
);

export default LoginButton;
