import React, { useState, useEffect } from 'react';

import Gallery from 'components/Gallery';
import HeadLine from 'components/Utils/HeadLine';

import { getLatestAlbums } from 'services/Albums';

const Home = () => {

    const [albums, changeAlbums] = useState([]);

    useEffect(() => {
        getLatestAlbums().then((response) => {
            changeAlbums(response.data)
        })
    }, []);
    
    return (
        <div className="columns is-mobile is-multiline">
          <div className="column is-12">
            <HeadLine
              title="La Musithèque, votre bibliothèque musicale"
              subtitle="Ecoutez, notez, critiquez."
            />
          </div>
          <Gallery albums={albums}/>         
        </div>
    );    
};


export default Home;
