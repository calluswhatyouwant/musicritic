/* @flow */

import React from 'react';

import LoginForm from './LoginForm';
import SocialButton from './../common/SocialButton';

const LoginPage = () => (
    <div className="row justify-content-center">
        <div className="col-sm-12 col-md-7 col-lg-5">
            <h1 className="text-center">Login with</h1>
            <LoginButtonGroup />
            <Separator />
            <LoginForm />
        </div>
    </div>
);

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
