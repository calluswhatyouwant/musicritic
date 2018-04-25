import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import Yup from 'yup';
import { withFormik } from 'formik';
import { toast } from 'react-toastify';

import { FormField } from '../common/form/form-field';
import { signIn } from '../../firebase/auth';

const LoginForm = ({ values, handleChange, isSubmitting, handleSubmit }) => (
    <Form onSubmit={handleSubmit}>
        <FormField name='email' label='Email' placeholder='name@example.com'
            value={values.email} onChange={handleChange} />
        <FormField name='password' label='Password' placeholder='Password'
            value={values.password} onChange={handleChange} type='password'/>
        <Button type='submit' disabled={isSubmitting} block>Log in to Musicritic</Button>
    </Form>
);

export default withFormik({
    mapPropsToValues: props => ({ email: '', password: '' }),
    handleSubmit: (values, { props, setSubmitting }) => {
        signIn(values.email, values.password)
            .then(userAuth => props.onLogin())
            .catch(error => {
                setSubmitting(false);
                console.log(error);
            });
    } 
})(LoginForm);
