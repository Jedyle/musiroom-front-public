import React from 'react';
import AbstractList from 'components/Utils/AbstractList';

const DiscussionsList = ({
    discussions
}) => (<AbstractList
         items={discussions}
       />
);

export default DiscussionsList;
