// app/menu/page.js
'use client';

import { useContext } from 'react';
import { GlobalStateContext } from '../../contexts/users';

export default function Sidebar() {
  const { state, setState } = useContext(GlobalStateContext);

  return (
    <div className="flex flex-col items-center h-full">

        {/* user profile area */}
        <div className="flex flex-col items-center">
            <img 
                className="w-64 h-64 rounded-full object-cover" 
                src={state[0].picture} 
                alt="user_picture" 
            />

            <div className="mt-8">
                {state[0].name}
            </div>
        </div>

        <p className="mt-28 mb-4 text-lg">Your List</p>

        {/* shopping list */}
        <div className="rounded-lg bg-white p-20 flex flex-start">
            <p>
                {state[0].shoppingList.map((item, index) => (
                    <li key={index} className="mt-2">
                    {item}
                    </li>
                ))}
            </p>
        </div>

    </div>

  );
}