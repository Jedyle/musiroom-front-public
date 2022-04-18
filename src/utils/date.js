import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import moment from 'moment';


// Add locale-specific relative date/time formatting rules.
TimeAgo.addLocale(en);

moment.locale('en-US');

function formatDate(date_string, format){
    return moment(date_string).format(format || 'DD MMMM YYYY');
}

const toHumanDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {timezone: 'UTC+2'});
};


function timeSince(date_string){
    let timeAgo = new TimeAgo('en-US');
    return timeAgo.format(new Date(date_string));
}

export {toHumanDate, formatDate, timeSince};
