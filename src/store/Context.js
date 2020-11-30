import React, { useState, useEffect } from 'react';
import firebase from './../api/Firebase';
import moment from 'moment';
const AtloContext = React.createContext();

export default AtloContext;

export function Provider(props) {
    const [currentUser, setCurrentUser] = useState(false);
    const [loadStatus, setLoadStatus] = useState(false);
    const [attendanceArray, setAttendanceArray] = useState({});
    const [userArray, setUsersArray] = useState([]);
    const [userArrayCalc, setUserArrayCalc] = useState([]);
    const [attendanceCalc, setAttendanceCalc] = useState([]);
    const [todayUsersData, setTodayUsersData] = useState([]);

    useEffect(() => {
        //initial data load

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
        //create user array compatible
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
        //create an array of all days attendance for each users - mainly for Datatable
        if (
            attendanceArray === null ||
            (Object.keys(attendanceArray).length === 0 &&
                attendanceArray.constructor === Object &&
                userArrayCalc.length > 0)
        )
            return false;

        var tempArray = [];
        for (const item in attendanceArray) {
            let allAttendanceinThisDate = attendanceArray[item];
            for (const attendenceItem in allAttendanceinThisDate) {
                var singleItem = allAttendanceinThisDate[attendenceItem];
                singleItem.userToken = attendenceItem;
                singleItem.date = item;
                const userAssociated = userArrayCalc.filter(
                    // eslint-disable-next-line no-loop-func
                    (el) => el.token === singleItem.userToken
                );

                if (userAssociated.length > 0) {
                    singleItem.username = userAssociated[0].username;
                    singleItem.department = userAssociated[0].department;
                    singleItem.userid = userAssociated[0].userid;
                    singleItem.userType = userAssociated[0].userType;
                    singleItem.name = userAssociated[0].name;
                    singleItem.number = userAssociated[0].number;
                    singleItem.designation = userAssociated[0].designation;
                    singleItem.branch = userAssociated[0].branch;
                    singleItem.emailid = userAssociated[0].emailid;
                    singleItem.effective = calculateEffective(singleItem);
                    tempArray.push(singleItem);
                }
            }
        }

        const today = moment().format('YYYY-MM-DD');
        setTodayUsersData(
            userArrayCalc.map((el) => {
                const thisUserTodayAttendance = tempArray.filter((item) => {
                    return item.date === today && item.userToken === el.token;
                });
                el.todayAttendance = false;
                if (thisUserTodayAttendance.length > 0)
                    el.todayAttendance = thisUserTodayAttendance[0];

                el.isShown =
                    el.todayAttendance === false
                        ? 'Not present'
                        : el.todayAttendance.weekOff === 'true'
                        ? 'Week Off'
                        : el.todayAttendance.leave === 'true'
                        ? 'Leave'
                        : 'Present';
                el.effective = calculateEffective(el.todayAttendance);
                return el;
            })
        );

        setAttendanceCalc(tempArray);
    }, [attendanceArray, userArrayCalc]);

    const contextData = {
        currentUser,
        setCurrentUser,
        attendanceArray,
        userArrayCalc,
        attendanceCalc,
        loadStatus,
        todayUsersData,
        // setAttendanceArray: (data) => {
        //     setAttendanceArray(data);
        //     setLoadStatus(true);
        // },
    };

    return (
        <AtloContext.Provider value={contextData}>
            {props.children}
        </AtloContext.Provider>
    );
}

function calculateEffective(item) {
    if (item.clockedIn === undefined) return 'N/A';

    let effective = getDifferenceOfThese(item.clockedIn, item.clockedOut);
    effective = effective - getDifferenceOfThese(item.lunchIn, item.lunchOut);
    return effective - getDifferenceOfThese(item.teaIn, item.teaOut);
    // const hours = Math.floor(effective / 60);
    // const minutes = effective % 60;
    // return secondsToHms(effective);
}

function getDifferenceOfThese(date1, date2) {
    if (date1 === undefined) return 0;
    const start = moment(date1);
    const end = date2 === undefined ? moment() : moment(date2);
    return end.diff(start, 'second');
}

function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? h + 'hr ' : '';
    var mDisplay = m > 0 ? m + 'min ' : '';
    var sDisplay = s > 0 ? s + 's' : '';
    return hDisplay + mDisplay + sDisplay;
}
