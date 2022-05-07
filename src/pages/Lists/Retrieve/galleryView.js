import React, { useState, useEffect } from 'react';
import { getAllListItems } from 'services/Lists';
import ListGallery from 'components/Gallery/ListGallery';

const ListGalleryView = ({list}) => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        getAllListItems({id: list.id}).then((response) => {
            setItems(response.data);
        })
    }, [list.id])

    const albums = items.map(item => item.album);
    
    return (
        <div className="column is-12">
          <ListGallery
            albums={albums}
            showIndex={list.ordered}
          />
        </div>
    );
}

export default ListGalleryView;
