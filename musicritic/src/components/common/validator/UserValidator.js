/* @flow */

import Yup from 'yup';

const equalTo = (ref: any, msg: any) => {
    const { path } = ref.path;
    return Yup.mixed().test({
        name: 'equalTo',
        message: msg || `${path} must be the same as ${ref}`,
        params: {
            reference: ref.path,
        },
        test(value) {
            return value === this.resolve(ref);
        },
    });
};

Yup.addMethod(Yup.string, 'equalTo', equalTo);

export const usernameValidator = () => {
    const min = 6;
    const max = 12;
    return Yup.string()
        .required('Username is required.')
        .min(6, `Username must have at least ${min} characters.`)
        .max(12, `Username must have up to ${max} characters.`);
};

export const emailValidator = () =>
    Yup.string()
        .email('Invalid email address.')
        .required('Email is required.');

export const passwordValidator = () => {
    const min = 6;
    const max = 12;
    return Yup.string()
        .required('Password is required.')
        .min(6, `Password must have at least ${min} characters.`)
        .max(12, `Password must have up to ${max} characters.`);
};

export const passwordConfirmationValidator = (passwordRef: any) =>
    Yup.string().equalTo(passwordRef, 'Passwords must match.');
