import './App.css';
import React, { useContext } from 'react';
import AtloContext, { Provider } from './store/Context';

function App() {
    return (
        <Provider>
            <div className='App'>Hell yeah! Hosting working fine now!</div>
            <Test></Test>
        </Provider>
    );
}

function Test() {
    const contextData = useContext(AtloContext);
    debugger;
    return (
        <div>
            {contextData &&
                contextData.userArray &&
                Object.keys(contextData.userArray).map(function (key) {
                    return (
                        <option value={key}>
                            {contextData.userArray[key].username}
                        </option>
                    );
                })}
        </div>
    );
    // <>

    // </>
}

export default App;
