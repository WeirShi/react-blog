import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import './App.less';

import Main from '@/views/main/index';
import NotFound from '@/views/not-found/index';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact render={()=> <Redirect to='/blog/home' push />} />
        <Route path='/blog' component={Main} />
        <Route path='/404' component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
