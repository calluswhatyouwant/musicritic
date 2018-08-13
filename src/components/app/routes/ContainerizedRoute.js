/* @flow */

import React from 'react';
import { Route } from 'react-router-dom';

import './ContainerizedRoute.css';

type Props = {
    component: any,
};

const wrapComponent = (Component: any, props: any) => (
    <div className="main container"><Component {...props} /></div>
);

const ContainerizedRoute = ({ component, ...rest }: Props) => (
    <Route
      {...rest}
      render={props => wrapComponent(component, props)}
    />
);

export default ContainerizedRoute;
