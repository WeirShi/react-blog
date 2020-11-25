import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import FancyRoute from './fancyRoute';

import Home from '@/views/home/index';
import Category from '@/views/category/index';
import Archive from '@/views/archive/index';
import About from '@/views/about/index';


export const Routes = () => 
    <Switch>
        <FancyRoute exact path='/blog/home' component={Home} />
        <FancyRoute exact path='/blog/category' component={Category} />
        <FancyRoute exact path='/blog/archive' component={Archive} />
        <FancyRoute exact path='/blog/about' component={About} />
        <Redirect from='*' to='/404' />
    </Switch>


// export default Routes;
