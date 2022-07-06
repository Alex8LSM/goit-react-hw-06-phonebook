// import React from 'react';
import { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { nanoid } from 'nanoid';
import ContactList from './ContactList/ContactList';
import importContacts from '../Data/Contacts.json';
import ContactForm from './ContactForm/ContactForm';
import Filter from './SearchFilter/SearchFilter';
import './App.css';

function Phonebook() {
  const [contacts, setContacts] = useLocalStorage('contacts', importContacts);
  const [filter, setFilter] = useState('');

  const addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    ) ||
    contacts.find(
      contact => contact.number.toLowerCase() === number.toLowerCase()
    )
      ? alert(`${name} or ${number} is already added.`)
      : setContacts(prevContacts => [contact, ...prevContacts]);
  };

  const deleteContact = contactId => {
    setContacts(() => contacts.filter(contact => contact.id !== contactId));
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const getVisibleContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div className="container">
      <h1 className="maintitle"> Phonebook </h1>
      <h2 className="title">Add new contact</h2>
      <ContactForm onSubmit={addContact} />
      <h2 className="title">Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={getVisibleContacts()}
        onDeleteContact={deleteContact}
      />
    </div>
  );
}

export const App = () => {
  return Phonebook();
};

// class Phonebook extends React.Component {
//   state = {
//     contacts: importContacts,
//     filter: '',
//   };

//   addContact = ({ name, number }) => {
//     const contact = {
//       id: nanoid(),
//       name,
//       number,
//     };

//     const { contacts } = this.state;

//     contacts.find(
//       ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
//     )
//       ? alert(`${name} is already in contacts.`)
//       : this.setState(({ contacts }) => ({ contacts: [...contacts, contact] }));
//   };

//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   changeFilter = event => {
//     this.setState({ filter: event.currentTarget.value });
//   };

//   getVisibleContacts = () => {
//     const { filter, contacts } = this.state;
//     const normalizedFilter = filter.toLowerCase();

//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//   };

//   componentDidMount() {
//     const parsedContacts = JSON.parse(localStorage.getItem('contacts'));

//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   render() {
//     const { filter } = this.state;
//     const visibleContacts = this.getVisibleContacts();
//     return (
//       <div className="container">
//         <h1 className="maintitle"> Phonebook </h1>
//         <h2 className="title">Add new contact</h2>
//         <ContactForm onSubmit={this.addContact} />
//         <h2 className="title">Contacts</h2>
//         <Filter value={filter} onChange={this.changeFilter} />
//         <ContactList
//           contacts={visibleContacts}
//           onDeleteContact={this.deleteContact}
//         />
//       </div>
//     );
//   }
// }

// export const App = () => {
//   return <Phonebook />;
// };
