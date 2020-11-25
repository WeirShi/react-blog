import { Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import './App.less';

import Main from '@/views/main/index';
import NotFound from '@/views/not-found/index';
import FancyRoute from '@/routes/fancyRoute';

function App() {
  return (
    <Router>
      <Switch>
        <FancyRoute path='/' exact render={()=> <Redirect to='/blog/home' push />} />
        <FancyRoute path='/blog' component={Main} />
        <FancyRoute path='/404' component={NotFound} />
        <FancyRoute component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
