import firebase from './Firebase';

export default function deleteAttendence() {
    var removeListRef = firebase.database().ref('attendence');
    removeListRef.remove();
    window.location.reload();
}
