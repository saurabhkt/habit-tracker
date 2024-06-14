'use client';

import { Habit as habitType } from "../../lib/definitions"
import { TrackerCell } from "./tracker-cell"
import { fetchHabits } from "../../lib/data"
import { useState } from "react";

const getNumOfCols = (viewType: string) => {
    switch (viewType) {
        case 'week':
            return 7;
        case 'month':
            return (
                new Date(
                    new Date().getFullYear(),
                    new Date().getMonth() + 1,
                    0
                ).getDate()
            
            );
        default:
            return 7;
    }
}

function saveHabit() {
    console.log('save habit');
}

export default function TableView({viewType}:{viewType: string}) {

    const habits = fetchHabits();
    const numOfCols = getNumOfCols(viewType);

    const [isAddingHabit, setIsAddingHabit] = useState(false);

    return (
        <div className="w-full">
            <table className="text-center text-black text-sm antialiased">
                <thead>
                    <tr>
                        <th className="border border-gray-300 text-blue-700 font-semibold min-w-48 cursor-default">Habit</th>
                        {[...Array(numOfCols)].map((_, i) => (
                            <th className="border border-gray-300 font-semibold bg-gray-200 text-13px w-6 cursor-default" key={i}>{i + 1}</th>
                        ))}
                        <th className="border border-gray-300 text-blue-700 font-semibold w-16 cursor-default">Goal</th>
                        <th className="border border-gray-300 text-blue-700 font-semibold w-16 cursor-default">Hit</th>
                    </tr>
                </thead>
                <tbody>
                    {habits.map((habit, i)=> {
                        return (
                            <TableRow
                                habit={habit}
                                columns={numOfCols}
                                key={i}
                            />
                        )
                    })}
                    { isAddingHabit? (
                        <>
                        <NewHabitRow columns={numOfCols} />
                        <SaveCancelHabitButtons />
                        </>
                        ) : (
                        <AddHabitButton />
                        )}
                </tbody>
            </table>
        </div>
    )

    function TableRow({
        habit,
        columns,
    }: {
        habit: habitType,
        columns: number,
    })  {
        return (
            <tr>
                <td className="border border-gray-300 bg-gray-200 text-13px px-1 text-left truncate">{habit.title}</td>
                {[...Array(columns)].map((_, i) => (
                    <TrackerCell
                        key={i}
                        day={i}
                        habit={habit}
                    />
                ))}
                <td className="border border-gray-300 text-13px text-center">{habit.goal}</td>
                <td className="border border-gray-300 text-13px text-center">{habit.notes}</td>
            </tr>
        )
    }

    function SaveCancelHabitButtons() {
        return (
            <tr>
                <td className="p-0 border border-gray-300">
                    <button
                        className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white text-13px text-center font-bold py-1 w-1/2"
                        onClick={() => {
                            saveHabit();
                            setIsAddingHabit(false)}
                        }
                    >
                    Save
                    </button>
                    <button
                        className="hover:bg-gray-200 cursor-pointer text-13px text-center font-bold py-1 w-1/2"
                        onClick={() => {
                            setIsAddingHabit(false)}
                        }
                    >
                    Cancel
                    </button>
                </td>
            </tr>
        )
    }
    
    function AddHabitButton() {
        return (
            <tr
                className="cursor-pointer"
                onClick={() => setIsAddingHabit(true)}
            >
                <td className="border border-gray-300 hover:bg-blue-500 hover:text-white text-blue-700 text-13px px-1 py-1 text-center font-bold truncate">
                    + Add Habit
                </td>
            </tr>
        )
    }
    
    function NewHabitRow({
        columns,
    }: {
        columns: number,
    }) {
        return (
            <tr>
                <td className="border border-gray-300">
                    <input
                        type="text"
                        className="w-full text-13px px-1"
                        autoFocus
                    ></input>
                </td>
                {[...Array(columns)].map((_, i) => (
                    <TrackerCell
                        key={i}
                        day={i}
                    />
                ))}
                <td className="border border-gray-300">
                    <input
                        type="number"
                        className="w-full text-13px px-1"
                    ></input>
                </td>
                <td className="border border-gray-300 text-13px text-center">
                </td>
            </tr>
        )
    }
}



