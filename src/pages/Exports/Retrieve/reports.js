import React from 'react';
import { GetAlbumLink } from 'pages/Links';

export const NewRatings = ({results, stats}) => (
    <>
      <h1 className="title is-size-4">New ratings ({stats.new_ratings})</h1>
      <p>These albums have been added to your collection</p>
      <br/>
      <div className="list">
        {results.map(
            (res) =>
                (
                    <div className="list-item">
                      <GetAlbumLink
                        title={res.title}
                        mbid={res.mbid}
                      /> {" -> "} {res.rating} 
                    </div>
                )
        )}
      </div>
    </>
);

export const Conflicts = ({results, stats}) => (
    <>
      <h1 className="title is-size-4">Conflits ({stats.conflicts})</h1>
      <p>Vous aviez déjà noté ces albums sur La Musithèque :
        {stats.erase_old ? " les notes ont été remplacées par celles de Senscritique." : " vos notes de La Musithèque ont été conservées"}
      </p>
      <br/>
      <div className="list">
        {results.map(
            (res) =>
                (
                    <div className="list-item">
                      <GetAlbumLink
                        title={res.title}
                        mbid={res.mbid}
                      /> {" -> "} {res.rating} 
                    </div>
                )
        )}
      </div>
    </>
);

export const NotFound = ({results, stats}) => (
    <>
      <h1 className="title is-size-4">Albums non trouvés ({stats.not_found})</h1>
      <p>
        Ces albums existent certainement dans notre base de données, mais n'ont pas été trouvés par notre algorithme, sans doute car les noms diffèrent de ceux de Senscritique. Faites une recherche via la barre de recherche pour noter ces albums.
      </p>
      <br/>
      <div className="list">
        {results.map(
            (res) =>
                (
                    <div className="list-item">
                      {res.album} {" -> "} {res.rating}
                    </div>
                )
        )}
      </div>
    </>
);
