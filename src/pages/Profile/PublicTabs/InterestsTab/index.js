import React, { Component } from 'react';
import { getInterests } from 'services/Profile';
import Paginator from 'components/Utils/Paginator';
import Filtrator from 'components/Utils/Filtrator';
import AbstractListTab from '../AbstractListTab';
import AlbumList from 'containers/AlbumList';

const InterestsList = ({
    results
}) => (
    <AlbumList
      ratedObjects={results}
      content={{}}
    />
);

const InterestsTab = (props) => (
    <AbstractListTab
      header={
          (<span>
            <hr/>
            <h4 className="title is-4 has-text-centered">Interests</h4>
            <hr/>
          </span>)
      }
      ListComponent={InterestsList}
      fetchElements={getInterests}
      {...props}
    />
);

export default InterestsTab;
