import firebase from './Firebase';

export function addUser(jsonData) {
    var postListRef = firebase.database().ref('users');
    var newPostRef = postListRef.push();
    newPostRef.set(jsonData);
}
