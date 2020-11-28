import { Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import Main from '@/views/main/index';
import NotFound from '@/views/not-found/index';
import ScrollToTop from '@/routes/scrollToTop';
import CustomRoute from '@/routes/customRoute';
import './App.less';

function App() {
  return (
    <Router>
      <ScrollToTop>
        <Switch>
          <CustomRoute path='/' exact render={()=> <Redirect to='/blog/home' push />} />
          <CustomRoute path='/blog' component={Main} />
          <CustomRoute path='/404' component={NotFound} />
          <CustomRoute component={NotFound} />
        </Switch>
      </ScrollToTop>
    </Router>
  );
}

export default App;
