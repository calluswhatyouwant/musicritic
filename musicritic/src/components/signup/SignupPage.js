/* @flow */

import React from 'react';

import SignupForm from './SignupForm';
import SocialButton from '../common/social-button/SocialButton';

import './SignupPage.css';

const SignupPage = () => (
    <div className="row justify-content-center">
        <div className="signup-page col-sm-12 col-md-7 col-lg-5">
            <h1 className="text-center">Signup with</h1>
            <SignupButtonGroup />
            <Separator />
            <SignupForm />
        </div>
    </div>
);

const SignupButtonGroup = () => (
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

export default SignupPage;
