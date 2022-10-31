import { configureStore } from '@reduxjs/toolkit';

import contactReducer from './contacts/contacts-slice';
import filterReducer from './filter/filter-reducer';

const store = configureStore({
  reducer: {
    contacts: contactReducer,
    filter: filterReducer,
  },
});

export default store;
