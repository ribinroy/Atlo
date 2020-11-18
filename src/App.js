import './App.scss';
import React, { useContext } from 'react';
import AtloContext, { Provider } from './store/Context';
import DT from './component/DataTable/DataTable';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
    return (
        <Provider>
            <Router>
                <Switch>
                    <Route path='/table'>
                        <DT />
                    </Route>
                </Switch>
            </Router>
        </Provider>
    );
}

export default App;
