/* @flow */

import React from 'react';
import { useHistory } from 'react-router-dom';

import LoginForm from './LoginForm';
import SocialButton from '../common/social-button/SocialButton';

const LoginPage = () => {
    const history = useHistory();

    const handleLogin = () => {
        history.push('/home');
    };

    return (
        <div className="row justify-content-center">
            <div className="col-sm-12 col-md-7 col-lg-5">
                <h1 className="text-center">Login with</h1>
                <LoginButtonGroup onLogin={handleLogin} />
                <Separator />
                <LoginForm onLogin={handleLogin} />
            </div>
        </div>
    );
};

const LoginButtonGroup = () => (
    <div className="signup-btn-group row">
        <div className="col-4">
            <SocialButton name="facebook" />
        </div>
        <div className="col-4">
            <SocialButton name="twitter" />
        </div>
        <div className="col-4">
            <SocialButton name="google" />
        </div>
    </div>
);

const Separator = () => (
    <div className="row separator text-center">
        <div className="col-5"><hr /></div>
        <div className="col-2">or</div>
        <div className="col-5"><hr /></div>
    </div>
);

export default LoginPage;
