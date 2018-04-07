import React, { Component } from 'react';
import { Button } from 'reactstrap';

import './signup.css';
import SignupForm from './SignupForm';

class SignupPage extends Component {
    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-5 col-sm-12 col-md-7 col-lg-5">
                    <h1 className="text-center">Signup with</h1>
                    <SignupButtonGroup />
                    <Separator />
                    <SignupForm />
                </div>
            </div>
        );
    }
}

const SignupButtonGroup = () => (
    <div className="signup-btn-group row">
        <div className="col-4">
            <SignupButton name={'facebook'} />
        </div>
        <div className="col-4">
            <SignupButton name={'twitter'} />
        </div>
        <div className="col-4">
            <SignupButton name={'google'} />
        </div>
    </div>
);

const SignupButton = ({name}) => (
    <Button className={`btn btn-block btn-signup btn-signup-${name} text-center`}>
        <span className={`fa fa-${name}`} />
    </Button>
);

const Separator = () => (
    <div className="row separator text-center">
        <div className="col-5"><hr /></div>
        <div className="col-2">or</div>
        <div className="col-5"><hr /></div>
    </div>
);

export default SignupPage;
