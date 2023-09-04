import React from 'react';
import ListGallery from 'components/Gallery/ListGallery';
import InfiniteScroll from "react-infinite-scroller";

const ListGalleryView = ({list, items, count, lastFetchedPage, authorRatings, onFetchMoreItems, onAddAlbum, onUpdateList, onUpdatePosition, onDeleteItem, hasMore}) => {

    let flattenedItems = [];
    for (let page = 1; page <= lastFetchedPage; page++){
        flattenedItems = flattenedItems.concat(items[page]);
    }
    let albums = flattenedItems.map(item => item.album);

    return (
        <div className="column is-12">
          <InfiniteScroll
            pageStart={0}
            loadMore={onFetchMoreItems}
            hasMore={hasMore}
            loader={<h4>Loading ...</h4>}
          >
            <ListGallery
              albums={albums}
              showIndex={list.ordered}
            />
          </InfiniteScroll>
        </div>
    );
}

export default ListGalleryView;
