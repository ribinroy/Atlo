import firebase from './Firebase';

export default function clearDevice(userId) {
    var updates = {};
    updates['/users/' + userId + '/deviceModel'] = null;
    updates['/users/' + userId + '/deviceToken'] = null;
    firebase.database().ref().update(updates);
}
