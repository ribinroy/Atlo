import React, { useState, useEffect } from 'react';
import firebase from './../api/Firebase';
const AtloContext = React.createContext();

export default AtloContext;

export function Provider(props) {
    const [currentUser, setCurrentUser] = useState(false);
    const [loadStatus, setLoadStatus] = useState(false);
    const [attendanceArray, setAttendanceArray] = useState([]);
    const [userArray, setUsersArray] = useState({});

    useEffect(() => {
        debugger;
        var getAllUsers = firebase.database().ref('users/');
        getAllUsers.on('value', function (response) {
            debugger;
            response.val();
            setUsersArray(response.val());
        });
    }, []);

    const contextData = {
        currentUser,
        attendanceArray,
        userArray,
        loadStatus,
        setCurrentUser: (data) => {
            setCurrentUser(data);
        },
        setAttendanceArray: (data) => {
            setAttendanceArray(data);
            setLoadStatus(true);
        },
        setUsersArray: (data) => {
            setUsersArray(data);
        },
    };

    return (
        <AtloContext.Provider value={contextData}>
            {props.children}
        </AtloContext.Provider>
    );
}
