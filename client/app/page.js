// app/menu/page.js
'use client';

import { useContext } from 'react';
import { GlobalStateContext } from '../contexts/users';

export default function Home() {
  const { state, setState } = useContext(GlobalStateContext);
  const { selectedUser, setSelectedUser } = useContext(GlobalStateContext);
  const { groceryItems, setGroceryItems } = useContext(GlobalStateContext);

  return (
    <div className="ml-12 mt-16">
      {/* user selection section */}
      <div>

        <p className="font-geologica text-4xl">Who do you want to shop with <br></br>today?</p>

        <div className="flex flex-row space-x-16">
          {state.map((user, index) => (
            <div key={index} className="flex flex-col items-center mt-8">
              <img
                className="w-32 h-32 rounded-full object-cover cursor-pointer"
                src={user.picture}
                alt="user_picture"
                onClick={() => setSelectedUser(index)}
              />
              <p className="text-lg font-geologica">{user.name}</p>
            </div>
          ))}
        </div>

        {/* grocery selection section */}
        <div className="mt-32">
          <p className="font-geologica text-4xl">Groceries</p>

          <div className="flex flex-row space-x-16">
            {groceryItems.map((item, index) => (
              <div key={index} className="flex flex-col items-center mt-8">
                <img
                  className="w-32 h-32 rounded-full object-cover cursor-pointer"
                  src={item.picture}
                  alt="grocery_picture"
                  onClick={() => console.log("clicked")}
                />
                <p className="text-lg font-geologica">{item.name}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}