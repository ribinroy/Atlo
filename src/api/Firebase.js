import firebase from 'firebase/app';
import 'firebase/database';

var firebaseConfig = {
    apiKey: 'AIzaSyBBb_KiB8M7KBplpD-RiWgf4AsqChsMV80',
    authDomain: 'officelogin-52977.firebaseapp.com',
    databaseURL: 'https://officelogin-52977.firebaseio.com',
    projectId: 'officelogin-52977',
    storageBucket: 'officelogin-52977.appspot.com',
    messagingSenderId: '249943095399',
    appId: '1:249943095399:web:ff7d56a21cf49a60f8bcc2',
    measurementId: 'G-KZ48YKCD7C',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const atloDB = firebase.database();
console.log(atloDB);

var starCountRef = firebase.database().ref('users/');
starCountRef.on('value', function (snapshot) {
    debugger;
    snapshot.val();
    //   updateStarCount(postElement, snapshot.val());
});

debugger;
export default firebase;
