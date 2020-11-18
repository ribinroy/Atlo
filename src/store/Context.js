import React, { useState, useEffect } from 'react';
import firebase from './../api/Firebase';
const AtloContext = React.createContext();

export default AtloContext;

export function Provider(props) {
    const [currentUser, setCurrentUser] = useState(false);
    const [loadStatus, setLoadStatus] = useState(false);
    const [attendanceArray, setAttendanceArray] = useState({});
    const [userArray, setUsersArray] = useState({});
    const [userArrayCalc, setUserArrayCalc] = useState([]);
    const [attendanceCalc, setAttendanceCalc] = useState([]);

    useEffect(() => {
        var getAllUsers = firebase.database().ref('users/');
        getAllUsers.on('value', function (response) {
            setUsersArray(response.val());
        });

        var getAllAttendance = firebase.database().ref('attendence/');
        getAllAttendance.on('value', function (response) {
            setAttendanceArray(response.val());
        });
    }, []);

    useEffect(() => {
        if (
            Object.keys(userArray).length === 0 &&
            userArray.constructor === Object
        )
            return false;

        var tempArray = [];
        for (const item in userArray) {
            let userObj = userArray[item];
            userObj.id = item;
            tempArray.push(userObj);
        }

        setUserArrayCalc(tempArray);
    }, [userArray]);

    useEffect(() => {
        if (
            Object.keys(attendanceArray).length === 0 &&
            attendanceArray.constructor === Object &&
            userArrayCalc.length > 0
        )
            return false;

        var tempArray = [];
        for (const item in attendanceArray) {
            let allAttendanceinThisDate = attendanceArray[item];
            for (const attendenceItem in allAttendanceinThisDate) {
                debugger;
                var singleItem = allAttendanceinThisDate[attendenceItem];
                singleItem.userToken = attendenceItem;
                singleItem.date = item;
                const userAssociated = userArrayCalc.filter(
                    // eslint-disable-next-line no-loop-func
                    (el) => el.token === singleItem.userToken
                );

                if (userAssociated.length > 0) {
                    singleItem.username = userAssociated[0].username;
                    singleItem.address = userAssociated[0].address;
                    singleItem.userid = userAssociated[0].userid;
                    singleItem.userType = userAssociated[0].userType;
                }

                tempArray.push(singleItem);
            }
        }
        console.log(tempArray);
        setAttendanceCalc(tempArray);
    }, [attendanceArray, userArrayCalc]);

    const contextData = {
        currentUser,
        attendanceArray,
        userArray,
        attendanceCalc,
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
