import './App.scss';
import React, { useContext } from 'react';
import AtloContext, { Provider } from './store/Context';
import DT from './component/DataTable/DataTable';
import Home from './component/Home/Home';
import Header from './component/Header/Header';
import Login from './component/Login/Login';
import Footer from './component/Footer/Footer';
import UsersList from './component/UsersList/UsersList';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';

import { authUser, resetAuthentication } from './utilities';

export default function App() {
    return (
        <Provider>
            <AppRouter></AppRouter>
        </Provider>
    );
}

function AppRouter() {
    const contextData = useContext(AtloContext);
    return (
        <Router>
            {contextData.loadStatus ? (
                <div className='main-container'>
                    <Switch>
                        <ValidAuthRoute exact path='/'>
                            <Login />
                        </ValidAuthRoute>
                        <ValidAuthRoute exact path='/login'>
                            <Login />
                        </ValidAuthRoute>
                        <PrivateRoute exact path='/home'>
                            <Header />
                            <Home />
                        </PrivateRoute>
                        <PrivateRoute exact path='/full-list'>
                            <Header />
                            <DT />
                        </PrivateRoute>
                        <PrivateRoute exact path='/users'>
                            <Header />
                            <UsersList />
                        </PrivateRoute>
                    </Switch>
                </div>
            ) : (
                <div className='flex--full-wrap'>Loading..</div>
            )}
            <Footer />
        </Router>
    );
}
function PrivateRoute({ children, ...rest }) {
    const contextData = useContext(AtloContext);
    const authUserName = authUser();
    if (authUserName !== null && contextData.userArrayCalc.length > 0) {
        const match = contextData.userArrayCalc.filter(
            (el) => el.userType === 'Admin' && el.username === authUserName
        );
        if (match.length > 0) contextData.setCurrentUser(match[0]);
        else resetAuthentication();
    }
    return (
        <Route
            {...rest}
            render={({ location }) =>
                contextData.currentUser ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: {
                                from: location,
                            },
                        }}
                    />
                )
            }
        />
    );
}

function ValidAuthRoute({ children, ...rest }) {
    const contextData = useContext(AtloContext);
    const authUserName = authUser();
    if (authUserName !== null && contextData.userArrayCalc.length > 0) {
        const match = contextData.userArrayCalc.filter(
            (el) => el.userType === 'Admin' && el.username === authUserName
        );
        if (match.length > 0) contextData.setCurrentUser(match[0]);
        else resetAuthentication();
    }
    return (
        <Route
            {...rest}
            render={({ location }) =>
                !contextData.currentUser ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/home',
                            state: {
                                from: location,
                            },
                        }}
                    />
                )
            }
        />
    );
}
