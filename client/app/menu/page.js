// app/menu/page.js
'use client';

import { useContext } from 'react';
import { GlobalStateContext } from '../../contexts/users';

export default function Sidebar() {
  const { state, setState } = useContext(GlobalStateContext);
  const { selectedUser, setSelectedUser } = useContext(GlobalStateContext);

  return (
    <div className="flex flex-col items-center h-full">

        {/* user profile area */}
        <div className="flex flex-col items-center">
            <img 
                className="w-64 h-64 rounded-full object-cover" 
                src={state[selectedUser].picture} 
                alt="user_picture" 
            />

            <div className="mt-8">
                <p className="text-white">{state[selectedUser].name}</p>
            </div>
        </div>

        <p className="mt-28 mb-4 text-lg text-white">Your List</p>

        {/* shopping list */}
        <div className="rounded-lg bg-white p-20 flex flex-start">
            <p>
                {state[selectedUser].shoppingList.map((item, index) => (
                    <li key={index} className="mt-2">
                    {item}
                    </li>
                ))}
            </p>
        </div>

    </div>

  );
}