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
      picture: '/testimg.jpg',
      shoppingList: [],
    },
    {
      name: 'test2',
      picture: '/testimg.jpg',
      shoppingList: [],
    },
  ]);
  const [groceryItems, setGroceryItems] = useState([
    {
        name: 'apple',
        picture: '/apple.png'
    },
    {
        name: 'carrot',
        picture: '/carrot.png'
    },
    {
        name: 'banana',
        picture: '/banana.png'
    },
    {
        name: 'donut',
        picture: '/donut.png'
    },
    {
        name: 'orange',
        picture: '/orange.png'
    }
  ]);
  const [selectedUser, setSelectedUser] = useState(0);
  const [finalList, setFinalList] = useState([]);

  return (
    <GlobalStateContext.Provider value={{ state, setState, selectedUser, setSelectedUser, groceryItems, setGroceryItems, finalList, setFinalList }}>
      {children}
    </GlobalStateContext.Provider>
  );
};