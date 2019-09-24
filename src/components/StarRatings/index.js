import React from 'react';
import StarRatings from 'react-star-ratings';

const StarRatingsChild = ({
    rating
}) => (
    <StarRatings
      rating={rating}
      starRatedColor="yellow"
      numberOfStars={10}
      name="rating"
    />
    
);

export default StarRatingsChild;
