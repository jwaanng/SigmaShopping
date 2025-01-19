// app/menu/page.js
'use client';

import { useContext, useEffect } from 'react';
import { GlobalStateContext } from '../contexts/users';

export default function Home() {
  const { state, setState, selectedUser, setSelectedUser, groceryItems } = useContext(GlobalStateContext);

  const handleAddItem = (item) => {
    console.log('Item clicked:', item.name);
    setState((prev) => {
      const newState = [...prev];
      newState[selectedUser] = {
        ...newState[selectedUser],
        shoppingList: [...newState[selectedUser].shoppingList, item.name],
      };
      console.log('Updated state:', newState);
      return newState;
    });
  };

  useEffect(() => {
    console.log('Component mounted or updated');
  }, [state]);

  return (
    <div className="mx-12 my-16 font-geologica">
      <p className="text-4xl">
        Who do you want to shop with <br /> today?
      </p>

      <div className="flex flex-row space-x-16">
        {state.map((user, index) => (
          <div key={index} className="flex flex-col items-center mt-8">
            <img
              className="w-32 h-32 rounded-full object-cover cursor-pointer"
              src={user.picture}
              alt="user_picture"
              onClick={() => setSelectedUser(index)}
            />
            <p className="text-lg">{user.name}</p>
          </div>
        ))}
      </div>

      {/* grocery selection section */}
      <div className="mt-32">
        <p className="text-4xl ml-4">Groceries</p>

        <div className="flex flex-wrap flex-row gap-16">
          {groceryItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center mt-8 border-2 rounded-2xl">
              <img
                className="w-64 h-64 rounded-2xl object-cover cursor-pointer border-2"
                src={item.picture}
                alt="grocery_picture"
                onClick={() => handleAddItem(item)}
              />
              <p className="text-lg my-8">{item.name}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}