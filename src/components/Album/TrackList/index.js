import React from 'react';

const TrackList = ({
    tracks=[]
}) => (
    <div>
      {
          tracks.map(
              (cd, index) => (
                  <div key={index}>
                    <br/>
                    <h1>{cd.medium_title || `CD${index+1}`}</h1>
                    <div className="list">
                      {
                          cd.tracks.map(
                              (track, index) => (
                                  <div className="list-item has-background-light" key={index}>
                                    <small>{index+1}</small>
                                    <span className="has-padding-left-10">{track.title}</span>
                                    <small> ({track.duration})</small>
                                  </div>
                              )
                          )
                      }
                    </div>
                  </div>
              )
          )}
    </div>
);

export default TrackList;
