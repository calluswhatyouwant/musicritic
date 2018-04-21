import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import Yup from 'yup';
import { withFormik } from 'formik';
import { toast } from 'react-toastify';

import { authenticateUser } from '../../api/users';
import { FormField } from '../common/form/form-field';

const LoginForm = ({ touched, errors, values, handleChange, isSubmitting, handleSubmit }) => (
    <Form onSubmit={handleSubmit}>
        <FormField name='username' label='Username' placeholder='Username'
            errors={errors.username} touched={touched.username}
            value={values.username} onChange={handleChange} />
        <FormField name='password' label='Password' placeholder='Password'
            errors={errors.password} touched={touched.password}
            value={values.password} onChange={handleChange} type='password'/>
        <Button type='submit' disabled={isSubmitting} block>Log in to Musicritic</Button>
    </Form>
);

export default withFormik({
    mapPropsToValues: props => ({ username: '', password: '' }),
    handleSubmit: (values, { props, setSubmitting }) => {
        authenticateUser(values).then(newUser => {
            setSubmitting(false);
            toast.success('User successfully logged in!');
        }).catch(error => {
            setSubmitting(false);
            toast.error(error.message);
        });
    }
})(LoginForm);
