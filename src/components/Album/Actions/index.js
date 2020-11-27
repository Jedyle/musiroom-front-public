import React from 'react';
import AddToListButton from 'components/Album/Actions/AddToList';
import AddToInterests from 'components/Album/Actions/AddToInterests';
import RateAlbum from 'components/Album/Actions/RateAlbum';

const RatingActions = ({rating, mbid, starDimension, starSpacing}) => (
    <>
      <RateAlbum
        rating={rating}
        starDimension={starDimension}
        starSpacing={starSpacing}
      />
      <br/>
      <br/>
      <div>
        <AddToListButton
          mbid={mbid}
        >Ajouter à une liste</AddToListButton>
        <AddToInterests
          mbid={mbid}
        />
      </div>
    </>
);

export default RatingActions;
