import React, { Component } from 'react';

import SignupForm from './SignupForm';

class SignupPage extends Component {
    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-sm-12 col-md-4">
                    <SignupButtonGroup />
                </div>
                <div className="col-sm-12 col-md-4">
                    <SignupForm />
                </div>
            </div>
        );
    }
}

const SignupButtonGroup = ({}) => <div></div>;

export default SignupPage;
