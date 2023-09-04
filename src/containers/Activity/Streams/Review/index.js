import React, {useState, useEffect} from 'react';
import AbstractStream from 'containers/Activity/Streams/Abstract';
import { getReviewActivity } from 'services/Activity';

function ReviewStream(props){

    const [results, setResults] = useState([]);

    useEffect(() => {
        getReviewActivity({limit:5}).then((response) => {
            setResults(response.data.results)
        })
    }, [])

    return (
        <AbstractStream
          results={results}
        />
    )
}

export default ReviewStream;
