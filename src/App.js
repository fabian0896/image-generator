import './App.css';
import {Header, Content, FormGroup} from './components'

import {Switch, BrowserRouter as Router, Route} from 'react-router-dom'

import {
  Home,
  Collection,
  Creator
} from './Pages'

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Content>
          <Switch>
            <Route path="/creator">
              <FormGroup/>
            </Route>
            <Route path="/collection">
              <Collection/>
            </Route>
            <Route path="/home">
              <Home/>
            </Route>
            <Route path="/">
              <Home/>
            </Route>
          </Switch>
        </Content>
      </Router>
    </div>
  );
}

export default App;
