import './App.css';
import ContextProvider from './Context.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Components/Home.js';
import WeatherGraph from './Components/WeatherGraph.js';
import WeatherMap from './Components/WeatherMap.js';
import AirPollution from './Components/AirPollution.js';

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home}/>

            <Route exact path='/WeatherGraph' component={WeatherGraph}/>

            <Route exact path='/WeatherMap' component={WeatherMap}/>

            <Route exact path='/AirPollution' component={AirPollution}/>
          </Switch>
        </BrowserRouter>
      </ContextProvider>
    </div>
  );
}

export default App;