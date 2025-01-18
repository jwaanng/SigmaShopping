// users.js
'use client';
import { createContext, useState } from 'react';

export const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [state, setState] = useState([
    {
      name: 'Mother',
      picture: '/testimg.jpg',
      shoppingList: [],
    },
    {
      name: 'test',
      picture: '',
      shoppingList: [],
    },
    {
      name: 'test2',
      picture: '',
      shoppingList: [],
    },
  ]);

  return (
    <GlobalStateContext.Provider value={{ state, setState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};