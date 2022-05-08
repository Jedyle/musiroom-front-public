import React, { useRef, useEffect } from 'react';
import { useScreenshot } from "use-screenshot-hook";
import { Link } from 'react-router-dom';
import { getAlbumUrl } from 'pages/urls';
import { truncate } from 'utils/strings'
import { trackClick } from 'utils/track';


const GalleryItem = ({album, index, showIndex}) => (
    // className is important to locate element with selenium !!
    <Link className="gallery-item" to={getAlbumUrl(album.mbid)}>
      <figure key={album.media_cover} className="image is-square">
        <img alt={album.title} src={album.media_cover} title={album.title}/>
      </figure>
      <h2 style={{textAlign: 'center', fontSize: '1.3vw'}}>
        {showIndex && `${index + 1}. `}
        {truncate(
            album.artists.map(
                (artist) => (artist.name)
            ).reduce((prev, curr) => [prev, ', ', curr]),
            40
        )
        }
      </h2>
      <h2 style={{textAlign: 'center', fontSize: '1vw'}}>
        {truncate(album.title, 45)}</h2>                
    </Link>    
);

// special gallery for lists, with 5 items per row

function sliceIntoChunks(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}

const ListGallery = ({albums, showIndex=false}) => {

    const chunks = sliceIntoChunks(albums, 5);

    const screenshotRef = useRef(0);
    const { image, takeScreenshot, isLoading } = useScreenshot({ref: screenshotRef});

    useEffect(() => {
        downloadImage(image);
    }, [image, isLoading]);
    
    const downloadImage = (img) => {
        // important because useEffect may be triggered
        // when img becomes undefined (ex: changing page)
        if (img && !isLoading){
            let a = document.createElement("a"); //Create <a>
            a.href = img; //Image Base64 Goes here
            a.download = "musiroom_collage.png"; //File name Here
            a.click(); //Downloaded file           
        }
    }

    const handleDownload = () => {
        trackClick({action: "download collage", label: window.location.href});
        takeScreenshot();
    }
    
    return (
        <>
          <div id="gallery" ref={screenshotRef} className="container is-fluid is-paddingless has-background-white">
            <div className="columns is-multiline is-mobile is-marginless">
              {chunks.map(
                  (chunk, chunkIndex) => (
                      <>
                        <div key={`${chunkIndex}-in`} className="column is-marginless is-paddingless is-1"></div>
                        {
                            chunk.map(
                                (album, index) => (
                                    <div className="column is-2 is-marginless" key={`${chunkIndex}-${index}`} style={{padding: '1vw'}}>
                                      <GalleryItem
                                        album={album}
                                        index={chunkIndex * 5 + index}
                                        showIndex={showIndex}
                                      />    
                                    </div>
                                )
                            )
                        }
                        <div key={`${chunkIndex}-out`} className="column is-1 is-marginless is-paddingless"></div>                  
                      </>
                  )                  
              )}            
            </div>
          </div>
          {/* this button has to be at the botton so that the user first loads all the data by scrolling */}
          <div className="container is-fluid">
            <div className="columns">
              <div className="column is-12-mobile is-8-tablet is-offset-2-tablet">
                <div className="buttons is-pulled-right">
                  <button className={`button is-normal is-link mr-5 ${isLoading && 'is-loading'}`} onClick={handleDownload} >
                    <i className="fa fa-download" style={{marginRight: '7px'}}></i>
                    Download as PNG
                  </button>
                </div>
              </div>                          
            </div>
          </div>
        </>
    )};

export default ListGallery;
