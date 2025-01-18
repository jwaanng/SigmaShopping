// app/menu/page.js
'use client';

import { useContext } from 'react';
import { GlobalStateContext } from '../../contexts/users';

export default function Sidebar() {
  const { state, setState } = useContext(GlobalStateContext);

  return (
    <div>
        <img 
            className="w-64 h-64 rounded-full object-cover item-center" 
            src={state[0].picture} 
            alt="user_picture" 
        />
        <div
            className="text-center"
        >
            {state[0].name}
        </div>
    </div>

  );
}