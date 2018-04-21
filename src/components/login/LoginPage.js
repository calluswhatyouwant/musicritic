import React, { Component } from 'react';
import { Button } from 'reactstrap';

import LoginForm from './LoginForm';

class LoginPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-sm-12 col-md-7 col-lg-5">
                    <h1 className="text-center">Login with</h1>
                    <LoginButtonGroup />
                    <Separator />
                    <LoginForm />
                </div>
            </div>
        );
    }
}

const LoginButtonGroup = () => (
    <div className="signup-btn-group row">
        <div className="col-4">
            <LoginButton name={'facebook'} />
        </div>
        <div className="col-4">
            <LoginButton name={'twitter'} />
        </div>
        <div className="col-4">
            <LoginButton name={'google'} />
        </div>
    </div>
);

const LoginButton = ({name}) => (
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

export default LoginPage;
