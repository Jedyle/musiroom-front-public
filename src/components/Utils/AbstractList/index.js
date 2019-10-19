import React from 'react';

const AbstractList = ({
    items
}) => (
    <div className="list">
      {items.map(
          (item) => (
              <div className="list-item">
                {item}
              </div>)
      )
      }
    </div>
);

export default AbstractList;
