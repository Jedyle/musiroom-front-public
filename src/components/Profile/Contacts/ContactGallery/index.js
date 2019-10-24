import React from 'react';
import ContactItem from '../ContactItem';

const ContactGallery = ({
    contacts
}) => (
    <div className="columns is-mobile is-multiline">
      {contacts.map((contact) => (
          <ContactItem
            key={contact.user}
            {...contact}
          />
      ))}
    </div>
);

export default ContactGallery;
