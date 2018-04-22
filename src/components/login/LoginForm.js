import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import Yup from 'yup';
import { withFormik } from 'formik';
import { toast } from 'react-toastify';

import { FormField } from '../common/form/form-field';

const LoginForm = ({ values, handleChange, isSubmitting, handleSubmit }) => (
    <Form onSubmit={handleSubmit}>
        <FormField name='username' label='Username' placeholder='Username'
            value={values.username} onChange={handleChange} />
        <FormField name='password' label='Password' placeholder='Password'
            value={values.password} onChange={handleChange} type='password'/>
        <Button type='submit' disabled={isSubmitting} block>Log in to Musicritic</Button>
    </Form>
);

export default withFormik({
    mapPropsToValues: props => ({ username: '', password: '' })
})(LoginForm);
