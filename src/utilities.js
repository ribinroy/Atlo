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
            <span className='sort-hider'>{d}</span>
            {string !== '' ? string : 'N/A'}
        </span>
    );
};

export const dateOnlyFormatter = (d, key) =>
    d[key] === undefined ? (
        'N/A'
    ) : (
        <span title={moment(d[key]).format('DD/MMMM/YYYY')}>
            <span className='sort-hider'>
                {moment(d[key]).format('YYYY/MM/DD hh:mm:ss A')}
            </span>
            {moment(d[key]).format('DD/MMM/YYYY')}
        </span>
    );

export const timeFormatter = (d, key) =>
    d[key] === undefined ? (
        'N/A'
    ) : (
        <span title={moment(d[key]).format('DD/MMMM/YYYY hh:mm A')}>
            <span className='sort-hider'>
                {moment(d[key]).format('YYYY/MM/DD hh:mm:ss A')}
            </span>
            {moment(d[key]).format('hh:mm:ss A')}
        </span>
    );
