import axios from 'axios';

const instanceContacts = axios.create({
  baseURL: 'https://6354741cccce2f8c02090c26.mockapi.io/api/contacts',
  params: {
    _limit: 12,
  },
});

export const getContacts = async () => {
  const { data } = await instanceContacts.get('/');
  return data;
};

export const addContact = async data => {
  const { data: result } = await instanceContacts.post('/', data);
  return result;
};

export const removeContact = async id => {
  const { data } = await instanceContacts.delete(`/${id}`);
  return data;
};
