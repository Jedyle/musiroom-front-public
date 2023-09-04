import React, { useState } from 'react';
import AlbumList from 'containers/AlbumList';
import Paginator from 'components/Utils/Paginator';
import { getUser } from 'services/Auth/api';
import AddAlbumSection from './addAlbumSection';
import ItemComment from './itemComment';
import { DeleteModal, PositionModal } from './modal';

import Avatar from 'components/Profile/Avatar';

import './style.css';

const ItemHeader = ({
    onChangePosition,
    onDelete
}) => (
    <div className="mt-5 mr-1">
      <div className="mt-5">
        <span className="icon" style={{cursor: 'pointer'}}
              onClick={onChangePosition}
        >
          <i className="fa fa-2x fa-arrows"></i>
        </span>
      </div>
      <div className="mt-5">
        <span className="icon" style={{cursor: 'pointer'}}
              onClick={onDelete}
        >
          <i className="fa fa-2x fa-trash"></i>
        </span>
      </div>
    </div>
);

const BulletView = ({list, items, count, perPage, lastFetchedPage, authorRatings, onFetchMoreItems, onAddAlbum, onSubmitItem, onUpdatePosition, onDeleteItem, hasMore}) => {
    const [state, setState] = useState({
        hasPrevious: false,
        page: 1
    });

    const hasNext = (state.page < lastFetchedPage) || (hasMore);

    const pageItems = items[state.page];

    const [deleteModal, setDeleteModal] = useState({
        isActive: false,
        currentItem: null
    });

    const onOpenDeleteModal = (currentItem) => {
        setDeleteModal({
            isActive: true,
            currentItem: currentItem
        })
    }

    const onCloseDeleteModal = () => {
        setDeleteModal({
            ...deleteModal,
            isActive: false
        })
    }

    const onSubmitDeleteModal = (currentItem) => {
        if (Math.floor(currentItem.order / perPage) === 1 && state.page === lastFetchedPage && hasMore === false && state.page !== 1){
            setState({
                page: state.page - 1,
                hasPrevious: state.page-1 > 1
            })
        }
        onDeleteItem(currentItem);
        onCloseDeleteModal();
    }

    const [positionModal, setPositionModal] = useState({
        isActive: false,
        currentItem: null
    });

    const onOpenPositionModal = (currentItem) => {
        setPositionModal({
            isActive: true,
            currentItem: currentItem
        })
    }

    const onClosePositionModal = () => {
        setPositionModal({
            ...positionModal,
            isActive: false
        })
    }

    const onSubmitPositionModal = (currentItem, newPosition) => {
        onUpdatePosition(currentItem, newPosition);
        onClosePositionModal();
    }

    const formatHeaderContent = () => {
        let headers = {};
        let userCanEdit = getUser() === list.user.username;
        pageItems.forEach((item, index) => {
            headers[item.album.rating.id] = (userCanEdit &&
                <ItemHeader
                  onChangePosition={() => onOpenPositionModal(item)}
                  onDelete={() => onOpenDeleteModal(item)}
                />);
        });
        return headers;
    }

    const formatContent = () => {
        let formattedRatings = {};
        let userCanEdit = getUser() === list.user.username;
        pageItems.forEach((item, index) => {
            formattedRatings[item.album.rating.id] = (
                (<div>
                   <p style={{maxHeight: "48px"}}>
                     <Avatar
                       size="is-48x48"
                       avatar={list.user.avatar}
                       alt={list.user.username}
                     />
                     <span className="tag ml-3 mt-3 is-medium is-profile-rating"
                           style={{position: "absolute"}}
                     >
                       {authorRatings[item.album.rating.id] || "-"}
                     </span>
                   </p>
                   <br/>
                   <ItemComment
                     comment={item.comment}
                     userCanEdit={userCanEdit}
                     onSubmit={(comment) => (onSubmitItem(list, item, state.page, index, comment))}
                   />
                 </div>
                ));
        });
        return formattedRatings;
    };

    let paginator = (
        <Paginator
          currentPage={state.page}
          previousPageUrl={state.hasPrevious}
          nextPageUrl={hasNext}
          onPreviousPage={() => setState({
              page: state.page-1,
              hasPrevious: state.page-1 > 1
          })}
          onNextPage={() => {
              if (items.hasOwnProperty(state.page+1)){
                  setState({
                      page: state.page + 1,
                      hasPrevious: true
                  })
              }
              else if (hasMore){
                  onFetchMoreItems().then(
                      setState({
                          page: state.page + 1,
                          hasPrevious: true
                      })
                  );
              }
          }}
        />
    );

    return (
        <div className="column is-12-mobile is-8-desktop is-offset-2-desktop">
          {count !== null && (
              <p className="has-text-centered">List of {count} albums</p>
          )}
          { getUser() === list.user.username &&
            <AddAlbumSection
              onAddAlbum={() => onAddAlbum(state.page)}
              list={list}
            />
          }
          <br/>
           <>
             <p className="has-text-centered">
               {paginator}
             </p>
             <br/>
             {pageItems && pageItems.length > 0 ?
              <AlbumList
                ranks={pageItems.map((item) => (item.order))}
                displayRanks={list.ordered}
                ratedObjects={pageItems.map((item) => (item.album))}
                content={formatContent()}
                headerContent={formatHeaderContent()}
              /> : null
             }
             <p className="has-text-centered">
               {paginator}
             </p>
           </>

          {getUser() && positionModal.currentItem &&
           (
               <PositionModal
                 list={list}
                 isActive={positionModal.isActive}
                 currentItem={positionModal.currentItem}
                 onSubmit={onSubmitPositionModal}
                 onClose={onClosePositionModal}
               />
           )
          }
          {getUser() && deleteModal.currentItem &&
           (
               <DeleteModal
                 list={list}
                 isActive={deleteModal.isActive}
                 currentItem={deleteModal.currentItem}
                 onSubmit={onSubmitDeleteModal}
                 onClose={onCloseDeleteModal}
               />
           )
          }
        </div>
    );
}


export default BulletView;
