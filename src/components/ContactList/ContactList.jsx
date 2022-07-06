import PropTypes from 'prop-types';
import ContactItem from '../ContactItem/ContactItem';
const ContactList = ({ contacts, onDeleteContact }) => (
  <ul>
    {contacts.map(contact => (
      <ContactItem
        contact={contact}
        onDeleteContact={onDeleteContact}
        key={contact.id}
      />
    ))}
  </ul>
);
ContactList.propTypes = {
  onDeleteContact: PropTypes.func,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
};
export default ContactList;
