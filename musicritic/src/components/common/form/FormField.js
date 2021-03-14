/* @flow */

import React from 'react';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';

type Props = {
    name: string,
    errors?: any,
    touched?: any,
    placeholder: string,
    value: string,
    onChange: () => void,
    label: string,
    type?: string,
};

const FormField = ({
    name,
    errors,
    touched,
    placeholder,
    value,
    onChange,
    label,
    type = 'text',
}: Props) => (
    <FormGroup>
        <Label for={name}>{label}</Label>
        <Input
            invalid={errors && touched}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
        <FormFeedback>{errors}</FormFeedback>
    </FormGroup>
);

FormField.defaultProps = {
    errors: null,
    touched: null,
    type: 'text',
};

export default FormField;
