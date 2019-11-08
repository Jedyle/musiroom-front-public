import TimeAgo from 'javascript-time-ago';
import fr from 'javascript-time-ago/locale/fr';
import moment from 'moment';
import 'moment/locale/fr';


// Add locale-specific relative date/time formatting rules.
TimeAgo.addLocale(fr);
 
moment.locale('fr');

function formatDate(date_string){
    return moment(date_string).format('DD MMMM YYYY, hh:mm');
}

function timeSince(date_string){
    let timeAgo = new TimeAgo('fr-FR');
    return timeAgo.format(new Date(date_string));
}

export {formatDate, timeSince};
