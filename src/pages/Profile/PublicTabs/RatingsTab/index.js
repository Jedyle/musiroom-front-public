import React from 'react';
import RatingsList from 'containers/RatingsList';
import { getRatings } from 'services/Profile';
import AbstractListTab from '../AbstractListTab';


const RatingsTab = (props) => (
    <AbstractListTab
      header={
          (<span>
             <hr/>
             <h4 className="title is-4 has-text-centered">Rated</h4>
             <hr/>
           </span>)
      }
      ListComponent={RatingsList}
      fetchElements={(props) => getRatings(
          {
              ...props,
              filtering: {
                  score__isnull: false
              }
          }
      )}
      orderingFields={[
          ['-modified', 'Recent'],
          ['-score', 'Best Ratings'],
          ['score', 'Worst Ratings']
      ]}

      {...props}
    />
);

export default RatingsTab;
