import './App.scss';
import React, { useContext } from 'react';
import AtloContext, { Provider } from './store/Context';
import DT from './component/DataTable/DataTable';
import Home from './component/Home/Home';
import Header from './component/Header/Header';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
    return (
        <Provider>
            <Router>
                <div className='main-container'>
                    <Header />
                    <Switch>
                        <Route exact path='/'>
                            <Home />
                        </Route>
                        <Route path='/full-list'>
                            <DT />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
