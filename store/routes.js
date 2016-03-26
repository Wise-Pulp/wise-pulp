import React from 'react';
import { Route } from 'react-router';
import  App from '../src/components/App';

export default (store) => (
    <Route path='/' component={App}>
    </Route>
);