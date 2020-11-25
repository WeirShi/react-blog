import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import Home from '@/views/home/index';
import Category from '@/views/category/index';
import Archive from '@/views/archive/index';
import About from '@/views/about/index';


export const Routes = () => 
    <Switch>
        <Route exact path='/blog/home' component={Home} />
        <Route exact path='/blog/category' component={Category} />
        <Route exact path='/blog/archive' component={Archive} />
        <Route exact path='/blog/about' component={About} />
        <Redirect from='*' to='/404' />
    </Switch>


// export default Routes;
