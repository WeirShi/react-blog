import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import Home from '@/views/home/index';
import Category from '@/views/category/index';
import Archive from '@/views/archive/index';
import About from '@/views/about/index';
import ArticleDetail from '@/views/article/index';


export const Routes = () => 
    <Switch>
        <Route exact path='/blog/home' component={Home} />
        <Route exact path='/blog/category' component={Category} />
        <Route exact path='/blog/archive' component={Archive} />
        <Route exact path='/blog/about' component={About} />
        <Route exact path='/blog/article/:id' component={ArticleDetail} />
        <Redirect from='*' to='/404' />
    </Switch>


// export default Routes;
