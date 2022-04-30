import React from 'react';
import RatingsList from 'containers/RatingsList';
import { getRatings } from 'services/Profile';
import AbstractListTab from '../AbstractListTab';


const InterestsTab = (props) => (
    <AbstractListTab
      header={
          (<span>
             <hr/>
             <h4 className="title is-4 has-text-centered">Collection</h4>
             <hr/>
           </span>)
      }
      ListComponent={RatingsList}
      fetchElements={(props) => getRatings(
          {
              ...props,
              filtering: {
                  is_interested: true
              }
          }
      )}
      orderingFields={[
          ['-modified', 'Recent'],
          ['modified', 'Oldest']
      ]}
      {...props}
    />  
);

export default InterestsTab;
