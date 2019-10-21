import React from 'react';

const AbstractList = ({
    items
}) => (
    <div className="list">
      {items.map(
          (item) => (
              <div className="list-item" style={
                  {
                      padding: ".75rem 1.25rem"
                  }
              }>
                {item}
              </div>)
      )
      }
    </div>
);

export default AbstractList;
