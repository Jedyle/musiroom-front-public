import React, { useState, useEffect } from 'react';
import { getListItems, updateListItemPosition, deleteListItem, updateListItem } from 'services/Lists';
import { getUserRatingsForRatings } from 'services/Ratings';

const ListView = ({list, ViewComponent, onUpdateList, ...props}) => {

    const perPage = 10;

    const [state, setState] = useState({
        items: {}, // {1: [items for page 1, 2: items for page 2]} etc etc
        count: 0,
        currentPage: 0,
        hasMore: true,
    })

    const [authorRatings, setAuthorRatings] = useState({});

    useEffect(() => {
        fetchMoreItems();
    }, []);

    const fetchItemsForPages = (pages) => {
        let promises = [];
        for (let page of pages){
            promises.push(
                getListItems({
                    id: list.id,
                    page: page,
                    perPage: perPage
                })
            )
        }
        Promise.all(promises).catch(
            errors => {
                return promises;
            }).then(
                responses => {
                    let newItems = Object.assign({}, state.items);
                    let newCurrentPage = state.currentPage;
                    let newCount = state.count;
                    let newHasMore = state.hasMore;
                    responses.forEach((response, index) => {
                        if (response.status === 200){
                            newItems[pages[index]] = response.data.results;
                            newCount = response.data.count;
                            if ((pages[index] === state.currentPage) && response.data.next !== null){
                                newHasMore = true;

                            }
                        }
                        else if (response.status === 404){
                            delete newItems[pages[index]];
                            if (pages[index] === state.currentPage){
                                newCurrentPage = state.currentPage - 1;
                            }
                        }
                    });
                    setState({
                        ...state,
                        items: newItems,
                        currentPage: newCurrentPage,
                        count: newCount,
                        hasMore: newHasMore
                    });
        })
    }

    const fetchMoreItems = () => {
        return getListItems({
            id: list.id,
            page: state.currentPage + 1,
            perPage: perPage
        }).then((response) => {
            let newItems = Object.assign({}, state.items);
            newItems[state.currentPage + 1] = response.data.results;
            setState({
                ...state,
                items: newItems,
                currentPage: state.currentPage + 1,
                hasMore: response.data.next !== null,
                count: response.data.count
            });
            fetchAuthorRatings(response.data.results);
        });
    }

    // author rating for a list of items (previously fetched in fetchMoreitems)
    const fetchAuthorRatings = (items) => {
        let ratingsIds = items.map((item) => (item.album.rating.id));
        getUserRatingsForRatings(list.user.username, ratingsIds).then((response) => {
            let authorRatings = Object.assign({}, state.authorRatings);
            for (let item of response.data.results){
                authorRatings[item.rating] = item.score;
            }
            setAuthorRatings(authorRatings);
        });
    }

    const reloadBetweenPositions = (pos1, pos2) => {
        // if a an item if moved for pos a to pos b, then we have to reload item between them only
        let lowPos, highPos;
        if (pos2 > pos1){
            lowPos = pos1;
            highPos = pos2;
        }
        else {
            lowPos = pos2;
            highPos = pos1;
        }
        let lowPosPage = Math.floor((lowPos - 1) / perPage) + 1;
        let highPosPage = Math.floor((highPos - 1) / perPage) + 1;
        let pages = []
        for (let i=lowPosPage; i<= highPosPage; i++){
            pages.push(i);
        }
        fetchItemsForPages(pages);
    }

    const reloadAfterPosition = (pos) => {
        // if a an item if moved for pos a to pos b, then we have to reload item between them only
        let posPage = Math.floor((pos - 1) / perPage) + 1;
        let pages = []
        for (let i=posPage; i<= state.currentPage; i++){
            pages.push(i);
        }
        fetchItemsForPages(pages);
    }

    const onUpdatePosition = (currentItem, newPosition) => {
        updateListItemPosition(list.id, currentItem.id, newPosition).then((response) => {
            reloadBetweenPositions(currentItem.order, newPosition);
        });
    }

    const onDeleteItem = (currentItem) => {
        deleteListItem(list.id, currentItem.id).then((response) => {
            // if we delete the last item, maybe the last page does not exist anymore, if so we go to the previous page instead
            reloadAfterPosition(currentItem.order);
        });
    }

    const onSubmitItem = (list, item, itemPage, itemIndex, comment) => {
        return updateListItem(list.id, item.id, {
            comment: comment
        }).then((response) => {
            let newItems = Object.assign({}, state.items);
            newItems[itemPage][itemIndex].comment = response.data.comment;
            setState({
                ...state,
                items: newItems
            })
        });
    }

    return (
        <>
          <ViewComponent
            list={list}
            items={state.items}
            count={state.count}
            perPage={perPage}
            lastFetchedPage={state.currentPage}
            authorRatings={authorRatings}
            onFetchMoreItems={fetchMoreItems}
            onAddAlbum={(page) => fetchItemsForPages([page, state.currentPage])}
            onSubmitItem={onSubmitItem}
            onUpdateList={onUpdateList}
            onUpdatePosition={onUpdatePosition}
            onDeleteItem={onDeleteItem}
            hasMore={state.hasMore}
          />
        </>
    )
};

export default ListView;
