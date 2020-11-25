import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import nprogress from 'nprogress'
import 'nprogress/nprogress.css';

const FancyRoute = props => {
    useState(nprogress.start());
    useEffect(() => {
        nprogress.done();
        return () => nprogress.start();
    });
    return (
        <Route {...props} />
    );
};
export default FancyRoute;
