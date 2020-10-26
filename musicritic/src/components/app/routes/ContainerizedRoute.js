/* @flow */

import React from 'react';
import { Route } from 'react-router-dom';

import './ContainerizedRoute.css';

type Props = {
    children: any,
};

const Container = ({ children }: any) => <div className="main">{children}</div>;

const ContainerizedRoute = ({ children, ...args }: Props) => (
    <Route {...args}>
        <Container>{children}</Container>
    </Route>
);

export default ContainerizedRoute;
