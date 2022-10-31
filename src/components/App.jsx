import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import s from './App.module.css';
import { useSelector, useDispatch } from 'react-redux';
// import { addContact, removeContact } from '../redux/contacts/contacts-slice';
import {
  fetchContacts,
  addContact,
  removeContact,
} from '../redux/contacts/contacts-operation';

// import { setFilter } from '../redux/filter/filter-slice';
import { setFilter } from '../redux/filter/filter-actions';
import { getFilter } from '../redux/filter/filter-selectors';
import { getFilteredContacts } from '../redux/contacts/contacts-selectors';
import { useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MoonLoader from 'react-spinners/MoonLoader';

export function App() {
  const loading = useSelector(state => state.contacts.loading);
  const items = useSelector(getFilteredContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const deleteContact = id => {
    // повертаються всі контакти що не дорівнюють "Id",
    // тобто того що ми хочемо видалити
    const action = removeContact(id);
    dispatch(action);
  };

  const formSubmitHandler = contact => {
    const { name } = contact;
    const checkAddName = items.some(el => el.name === name);

    if (checkAddName) {
      return toast.error(`${name} is already in contacts.`, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    // в contacts записується новий масив в який розпилюється
    // попереднє значення та додається новий контакт
    const action = addContact(contact);
    dispatch(action);
  };

  const handleChange = event => {
    dispatch(setFilter(event.currentTarget.value));
  };

  return (
    <div className={s.phonebook}>
      <div className={s.phonebook__card}>
        <h1 className={s.phonebook__title}>Phonebook</h1>
        <ContactForm addContact={formSubmitHandler} />

        <div className={s.phonebook__wrapper}>
          <h2 className={s.phonebook__second_title}>Contacts</h2>
          <MoonLoader
            color={'#6afff3'}
            loading={loading}
            size={15}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
        <Filter input={filter} onChange={handleChange} />
        {items.length === 0 ? (
          <p className={s.empty__text}>Phone book is empty</p>
        ) : (
          <ContactList contacts={items} onDeleteContact={deleteContact} />
        )}
      </div>
      <ToastContainer
        theme="colored"
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
