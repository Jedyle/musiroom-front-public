import React from 'react';

const DiscussionsList = ({
    discussions
}) => (
    <div className="list">
      {discussions.map(
          (discussion) => (
              <div className="list-item">
                {discussion}
              </div>)
      )
      }
    </div>
);

export default DiscussionsList;
