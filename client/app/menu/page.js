'use client';
import Link from 'next/link';
import { useContext } from 'react';
import { GlobalStateContext } from '../../contexts/users';

export default function Sidebar() {
  const { state, setState } = useContext(GlobalStateContext);
  const { selectedUser, setSelectedUser } = useContext(GlobalStateContext);
  const { finalList, setFinalList } = useContext(GlobalStateContext);
  const submitHandler = () => {
    setFinalList(state[selectedUser].shoppingList);
  }

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
        <div className="rounded-lg bg-white p-4 flex flex-col items-start h-64 w-64 overflow-y-auto">
            <p>
                {state[selectedUser].shoppingList.map((item, index) => (
                    <li key={index} className="mt-2">
                    {item}
                    </li>
                ))}
            </p>
        </div>
        
        <Link 
            href="/list"
            className="bg-[#18a5b7] text-white p-2 shadow-md mt-8 rounded-2xl"
            onClick={() => {submitHandler()}}
        >
            Submit
        </Link>
    </div>

      <div id="results">
        {results.map((result, index) => (
          <p key={index}>
            Class: {result.class_name}, Confidence: {result.confidence}, Coordinates: {result.coordinates.join(', ')}
          </p>
        ))}
      </div>
    </div>
  );
}