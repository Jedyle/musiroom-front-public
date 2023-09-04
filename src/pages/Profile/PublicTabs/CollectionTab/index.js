import React from 'react';
import RatingsList from 'containers/RatingsList';
import { getRatings } from 'services/Profile';
import AbstractListTab from '../AbstractListTab';



function CollectionTab(props){

    return (
        <AbstractListTab
          header={
              (<span>
                 <hr/>
                 <h4 className="title is-4 has-text-centered">Collection</h4>
                 <hr/>
               </span>)
          }
          ListComponent={RatingsList}
          fetchElements={getRatings}
          filteringArgs={""}
          orderingFields={[
              ['-modified', 'Recent'],
              ['modified', 'Oldest'],
              ['-score', 'Best Ratings'],
              ['score', 'Worst Ratings']
          ]}
          filteringFields={[
              ["collection", "Collection", {is_in_collection: true}],
              ["not_rated_in_collection", "Finished but not rated", {is_in_collection: true, score__isnull:true}],
              ["interest", "Interests", {is_interested: true}],
          ]}
          {...props}
        />
    )};

export default CollectionTab;
