import React, {useState, useEffect} from 'react';
import AbstractStream from 'containers/Activity/Streams/Abstract';
import { getRatingActivity } from 'services/Activity';

function RatingStream(props){

    const [results, setResults] = useState([]);

    useEffect(() => {
        getRatingActivity({limit:5}).then((response) => {
            setResults(response.data.results)
        })
    }, [])

    return (
        <AbstractStream
          results={results}
        />
    )
}

export default RatingStream;
