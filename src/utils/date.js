import TimeAgo from 'javascript-time-ago';
import fr from 'javascript-time-ago/locale/fr';
import moment from 'moment';
import 'moment/locale/fr';


// Add locale-specific relative date/time formatting rules.
TimeAgo.addLocale(fr);
 
moment.locale('fr');

function formatDate(date_string, format){
    return moment(date_string).format(format || 'DD MMMM YYYY');
}

const toHumanDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
};


function timeSince(date_string){
    let timeAgo = new TimeAgo('fr-FR');
    return timeAgo.format(new Date(date_string));
}

export {toHumanDate, formatDate, timeSince};
