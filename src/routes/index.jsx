import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import AsyncComponent from './asyncComponent';

const Home = AsyncComponent(() => import('@/views/home'));
const Category = AsyncComponent(() => import('@/views/category'));
const Archive = AsyncComponent(() => import('@/views/archive'));
const About = AsyncComponent(() => import('@/views/about'));
const ArticleDetail = AsyncComponent(() => import('@/views/article'));
const ArticleListWithCategory = AsyncComponent(() => import('@/views/category/list'));


export const Routes = () => 
    <Switch>
        <Route exact path='/blog/home' component={Home} />
        <Route exact path='/blog/category' component={Category} />
        <Route exact path='/blog/archive' component={Archive} />
        <Route exact path='/blog/about' component={About} />
        <Route exact path='/blog/article/:id' component={ArticleDetail} />
        <Route exact path='/blog/article/:type/:id' component={ArticleListWithCategory} />
        <Redirect from='*' to='/404' />
    </Switch>


// export default Routes;
