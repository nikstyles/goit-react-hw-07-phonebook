export const getContacts = ({ contacts }) => contacts.items;
export const getState = ({ contacts }) => ({
  loading: contacts.loading,
  error: contacts.error,
});

export const getFilteredContacts = ({ contacts, filter }) => {
  if (!filter) {
    return contacts.items;
  }

  const normalizedFilter = filter.toLocaleLowerCase();
  const filterlist = contacts.items.filter(contact => {
    return contact.name.toLocaleLowerCase().includes(normalizedFilter);
  });
  return filterlist;
};
