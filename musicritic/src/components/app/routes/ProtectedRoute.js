/* @flow */

import React from 'react';
import { Route } from 'react-router-dom';

import { useCurrentUser } from '../../app/App';
import Loading from '../../common/loading/Loading';

import SocialButton from '../../common/social-button/SocialButton';

import './ProtectedRoute.css';

const AuthRequirement = () => {
    const serverBaseUri = process.env.SERVER_BASE_URL || '';

    return (
        <div className="auth-requirement">
            <div className="auth-requirement-wrapper col-sm-12 col-md-7 col-lg-5">
                <h1 className="auth-requirement-title">
                    Oops... You can&apos;t access this content.
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
    const user = useCurrentUser();
    if (user) {
        return (
            <Route {...args}>
                {user === 'unknown' ? <Loading /> : children}
            </Route>
        );
    }
    return (
        <Route {...args}>
            <AuthRequirement />
        </Route>
    );
};

export default ProtectedRoute;
