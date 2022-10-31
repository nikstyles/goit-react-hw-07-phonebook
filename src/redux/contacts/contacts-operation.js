// import actions from './contacts-actions';

import * as api from '../../Api/contacts';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchContacts = createAsyncThunk(
  'contacts/fetch',
  async (_, thunkApi) => {
    try {
      // console.log(thunkApi);
      const data = await api.getContacts();
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

// export const fetchContacts = () => {
//   const func = async dispatch => {
//     dispatch(actions.fetchContactsLoading());
//     try {
//       const data = await api.getContacts();
//       dispatch(actions.fetchContactsSuccess(data));
//     } catch (error) {
//       const { message, response } = error;
//       const errorData = {
//         message,
//         status: response.status,
//       };
//       dispatch(actions.fetchContactsError(errorData));
//     }
//   };
//   return func;
// };

export const addContact = createAsyncThunk(
  'contacts/add',
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.addContact(data);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// export const addContact = data => {
//   const func = async (dispatch, getState) => {
//     // const { contacts } = getState();
//     // if (isDublicate(data, books.items)) {
//     //   return alert('This book already exists');
//     // }
//     try {
//       dispatch(actions.addContactLoading());
//       const result = await api.addContact(data);
//       dispatch(actions.addContactSuccess(result));
//     } catch (error) {
//       const { message, response } = error;
//       const errorData = {
//         message,
//         status: response.status,
//       };
//       dispatch(actions.addContactError(errorData));
//     }
//   };
//   return func;
// };

export const removeContact = createAsyncThunk(
  'contacts/remove',
  async (id, { rejectWithValue }) => {
    try {
      await api.removeContact(id);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// export const removeContact = id => {
//   const func = async dispatch => {
//     try {
//       dispatch(actions.removeContactLoading());
//       await api.removeContact(id);
//       dispatch(actions.removeContactSuccess(id));
//     } catch (error) {
//       const { message, response } = error;
//       const errorData = {
//         message,
//         status: response.status,
//       };
//       dispatch(actions.removeContactError(errorData));
//     }
//   };
//   return func;
// };
