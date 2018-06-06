import React from 'react';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';

const FormField = ({
    name, errors, touched, placeholder, value, onChange, label, type = 'text',
}) => (
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

export default FormField;
