import moment from 'moment';
import 'moment/locale/fr';

moment.locale('fr');

function formatDate(date_string){
    return moment(date_string).format('DD MMMM YYYY, hh:mm');
}

function timeSince(date_string){
    return moment().diff(date_string, 'years');
}

export {formatDate, timeSince};
