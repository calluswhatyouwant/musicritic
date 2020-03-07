/* @flow */

import React from 'react';
import { Form, Button } from 'reactstrap';
import { withFormik } from 'formik';

import { signInWithEmailAndPassword } from '../../firebase/auth';
import FormField from '../common/form/FormField';

type Props = {
    values: any,
    handleChange: () => void,
    isSubmitting: boolean,
    handleSubmit: () => void,
};

const LoginForm = ({
    values, handleChange, isSubmitting, handleSubmit,
}: Props) => (
    <Form onSubmit={handleSubmit}>
        <FormField
          name="email"
          label="Email"
          placeholder="name@example.com"
          value={values.email}
          onChange={handleChange}
        />
        <FormField
          name="password"
          label="Password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          type="password"
        />
        <Button type="submit" disabled={isSubmitting} block>
            Log in to Musicritic
        </Button>
    </Form>
);

export default withFormik({
    mapPropsToValues: () => ({ email: '', password: '' }),
    handleSubmit: (values, { props, setSubmitting }) => {
        signInWithEmailAndPassword(values.email, values.password)
            .then(() => props.onLogin())
            .catch(() => {
                setSubmitting(false);
            });
    },
})(LoginForm);
