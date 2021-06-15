import './App.css';
import {Header, Content} from './components'

import {Switch, BrowserRouter as Router, Route} from 'react-router-dom'

import {
  Home,
  Collection,
  Creator,
  Image
} from './Pages'

import { ConfigProvider } from './context/configContext'

function App() {
  return (
    <div className="App">
      <ConfigProvider>
        <Router>
          <Header/>
          <Content>
            <Switch>
              <Route path="/creator/:id">
                <Creator/>
              </Route>
              <Route path="/creator">
                <Creator/>
              </Route>
              <Route path="/collection">
                <Collection/>
              </Route>
              <Route path="/home">
                <Home/>
              </Route>
              <Route path="/image/:id">
                <Image/>
              </Route>
              <Route path="/">
                <Home/>
              </Route>
            </Switch>
          </Content>
        </Router>
      </ConfigProvider>
    </div>
  );
}

export default App;
