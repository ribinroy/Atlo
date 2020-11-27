import moment from 'moment';
export const HMSFormatter = (d, key) => {
    d = Number(d[key]);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);
    var hDisplay = h > 0 ? h + 'hr ' : '';
    var mDisplay = m > 0 ? m + 'min ' : '';
    var sDisplay = s > 0 ? s + 's' : '';
    const string = hDisplay + mDisplay + sDisplay;
    return (
        <span>
            {/* <span className='sort-hider'>{d}</span> */}
            <span>{string !== '' ? string : 'N/A'}</span>
        </span>
    );
};

export const dateOnlyFormatter = (d, key) =>
    d[key] === undefined ? (
        'N/A'
    ) : (
        <span title={moment(d[key]).format('DD/MMMM/YYYY')}>
            {/* <span className='sort-hider'>
                {moment(d[key]).format('YYYY/MM/DD hh:mm:ss A')}
            </span> */}
            {moment(d[key]).format('DD/MMM/YYYY')}
        </span>
    );

export const timeFormatter = (d, key) =>
    d[key] === undefined ? (
        'N/A'
    ) : (
        <span title={moment(d[key]).format('DD/MMMM/YYYY hh:mm A')}>
            {/* <span className='sort-hider'>
                {moment(d[key]).format('YYYY/MM/DD hh:mm:ss A')}
            </span> */}
            {moment(d[key]).format('hh:mm:ss A')}
        </span>
    );

export const timeFormatterExtraKey = (d, key, innerKey) =>
    d[key][innerKey] === undefined ? (
        'N/A'
    ) : (
        <span title={moment(d[key][innerKey]).format('DD/MMMM/YYYY hh:mm A')}>
            {/* <span className='sort-hider'>
                {moment(d[key][innerKey]).format('YYYY/MM/DD hh:mm:ss A')}
            </span> */}
            {moment(d[key][innerKey]).format('hh:mm:ss A')}
        </span>
    );

export function setCookie(name, value, days) {
    var expires = '';
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

export function getCookie(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return c.substring(nameEQ.length, c.length);
    }
    return null;
}

export function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}

export function setAuthenticated(username) {
    localStorage.setItem('logged_in', username);
}

export function authUser() {
    return localStorage.getItem('logged_in');
}

export function resetAuthentication() {
    localStorage.removeItem('logged_in');
}
