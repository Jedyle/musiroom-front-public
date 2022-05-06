import React from 'react';

const FormattedUserRating = ({userRating}) => {
    if (userRating){
        if (userRating.score){
            return userRating.score;
        }
        else if (userRating.is_in_collection){
            return (
                <span className="icon" title="In collection">
                  <i className="fa fa-headphones"></i>
                </span>                    
            );
        }
        else if (userRating.is_interested){
            return (
                <span className="icon" title="Wants to listen">
                  <i className="fa fa-map-marker"></i>
                </span>
            );                
        }
    }       
    return '-';
};

export default FormattedUserRating;
