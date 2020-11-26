import { Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import Main from '@/views/main/index';
import NotFound from '@/views/not-found/index';
import ScrollToTop from '@/routes/scrollToTop';
import FancyRoute from '@/routes/fancyRoute';
import './App.less';

function App() {
  return (
    <Router>
      <ScrollToTop>
        <Switch>
          <FancyRoute path='/' exact render={()=> <Redirect to='/blog/home' push />} />
          <FancyRoute path='/blog' component={Main} />
          <FancyRoute path='/404' component={NotFound} />
          <FancyRoute component={NotFound} />
        </Switch>
      </ScrollToTop>
    </Router>
  );
}

export default App;
