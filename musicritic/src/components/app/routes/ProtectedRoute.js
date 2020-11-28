/* @flow */

import React from 'react';
import { Route } from 'react-router-dom';
import { useSession } from '../../app/App';

import SocialButton from '../../common/social-button/SocialButton';

import './ProtectedRoute.css';

const AuthRequirement = () => {
    const serverBaseUri = process.env.SERVER_BASE_URL || '';

    return (
        <div className="auth-requirement">
            <div className="auth-requirement-wrapper col-sm-12 col-md-7 col-lg-5">
                <h1 className="auth-requirement-title">
                    Oops... You can't access this content.
                </h1>
                <h3 className="auth-requirement-text">
                    Please, sign in and try again.
                </h3>
                <SocialButton
                    name="spotify"
                    url={`${serverBaseUri}/auth/login`}
                />
            </div>
        </div>
    );
};

type ProtectedRouteProps = {
    children: any,
};

const ProtectedRoute = ({ children, ...args }: ProtectedRouteProps) => {
    const user = useSession();
    return <Route {...args}>{user ? children : <AuthRequirement />}</Route>;
};

export default ProtectedRoute;
