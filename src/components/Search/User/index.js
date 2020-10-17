import React from 'react';
import ContactGallery from 'components/Profile/Contacts/ContactGallery';
import { profileUrl } from 'pages/urls';

const UserSearch = ({results}) => (
    <>
    <ContactGallery
      contacts={results.map((user) => ({
          user: user.user,
          avatar: process.env.REACT_APP_API_URL + user.avatar,
          profile_url: profileUrl(user.user)
      }))}      
        />
    </>
);

export default UserSearch;
