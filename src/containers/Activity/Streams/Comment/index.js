import React, {useState, useEffect} from 'react';
import AbstractStream from 'containers/Activity/Streams/Abstract';
import { getCommentActivity } from 'services/Activity';

function CommentStream(props){

    const [results, setResults] = useState([]);

    useEffect(() => {
        getCommentActivity({limit:5}).then((response) => {
            setResults(response.data.results)
        })
    }, [])
    
    return (
        <AbstractStream
          results={results}
        />
    )
}

export default CommentStream;
