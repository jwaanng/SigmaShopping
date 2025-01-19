'use client';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { GlobalStateContext } from '../../contexts/users';

export default function List() {
    const { state, setState } = useContext(GlobalStateContext);
    const { selectedUser, setSelectedUser } = useContext(GlobalStateContext);
    const { finalList, setFinalList } = useContext(GlobalStateContext);

    // State to keep track of checked items
    const [checkedItems, setCheckedItems] = useState({});

    // Function to handle checkbox changes
    const crossOffItem = (index) => {
        setCheckedItems((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    return (
        <div className="mx-12 my-16 font-geologica space-y-8">
            <div className="flex items-center justify-between">
                <Link href="/" className="rounded-2xl shadow-md p-2 px-4 bg-[#cbcfd2]">
                    ←
                </Link>

                <h1 className="text-center flex-grow text-xl">Shopping List</h1>
            </div>

            <div className="flex">
                <div className="rounded-3xl p-8 shadow-md flex-grow">
                    {finalList.map((item, index) => (
                        <div key={index} className="flex items-center mt-2">
                            <label htmlFor={`item-${index}`} className="text-lg flex-grow">
                                {item}
                            </label>
                            <input
                                type="checkbox"
                                id={`item-${index}`}
                                className="ml-2 custom-checkbox"
                                checked={checkedItems[index] || false}
                                onChange={() => crossOffItem(index)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}