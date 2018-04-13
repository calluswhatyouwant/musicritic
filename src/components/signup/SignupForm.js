import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

class SignupForm extends Component {
    render() {
        return (
            <Form>
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input type="text" name="username" placeholder="Username" />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" placeholder="name@example.com" />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" placeholder="Password" />
                </FormGroup>
                <FormGroup>
                    <Label for="passwordConfirmation">Confirm password</Label>
                    <Input type="password" name="passwordConfirm" placeholder="Password" />
                </FormGroup>
                <Button block>Sign up for Musicritic</Button>
            </Form>
        );
    }
}

export default SignupForm;
