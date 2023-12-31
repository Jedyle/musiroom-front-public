import React from 'react';

const Filtrator = ({
    onPressEnter
}) => (
    <input
      className="input has-margin-top-10"
      type="text"
      placeholder="Album title..."
      onKeyDown={(event) => {
          if (event.keyCode === 13){
              onPressEnter(event);
          }
      }}
    />
);

export default Filtrator;
