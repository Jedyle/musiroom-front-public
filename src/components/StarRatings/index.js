import React from 'react';
import StarRatings from 'react-star-ratings';

const StarRatingsChild = ({
    rating,
    ...props
}) => (
    <StarRatings
      rating={rating}
      starRatedColor="yellow"
      numberOfStars={10}
      name="rating"
      {...props}
    />
    
);

export default StarRatingsChild;
