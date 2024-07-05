'use client';

import { Habit as habitType, HabitCombined, HabitPeriod } from "../../_lib/definitions"
import { TrackerCell } from "./tracker-cell"
import { useState } from "react";
import { getLastDayOfMonth } from "@/app/_lib/utils";
import { NewHabitRow, SaveCancelHabitButtons } from "./tracker-new-habit-row";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import useOutsideClick from "@/app/_lib/outside-click";

const getNumOfCols = (viewType: string) => {
    switch (viewType) {
        case 'week':
            return 7;
        case 'month':
            return (
                getLastDayOfMonth(new Date()).getDate()
            
            );
        default:
            return 7;
    }
}

export default function TableView({viewType, habits}:{viewType: string, habits: HabitCombined[]}) {
    const numOfCols = getNumOfCols(viewType);
    
    const [tableState, setTableState] = useState('');

    return (
        <div className="w-full">
            <table className="text-center text-black text-sm antialiased">
                <thead>
                    <tr>
                        <th className="border border-gray-300 text-blue-700 font-semibold min-w-48 cursor-default p-1">Habit</th>
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
                                key={habit.id}
                                habit={habit}
                                columns={numOfCols}
                                index={i}
                            />
                        )
                    })}
                    { tableState == 'adding-row' ? (
                        <NewHabitRow columns={numOfCols} setTableState={setTableState} />
                        ) : (
                        <AddHabitButton setTableState={setTableState} />
                        )}
                </tbody>
            </table>
        </div>
    )
}

function TableRow({
    habit,
    columns,
    index,
}: {
    habit: HabitCombined,
    columns: number,
    index: number,
})  {

    const [rowState, setRowState] = useState('');

    return (
        <tr
            className="group hover:bg-gray-100"
        >
            <td
                className={
                    (rowState == 'editing' ? "bg-white" : "bg-gray-200 group-hover:bg-gray-100") +
                    " border border-gray-300 p-1 text-13px text-left truncate cursor-pointer relative"
                }
            >
                {rowState == 'editing' ? (
                    <input
                        type="text"
                        className="w-full text-13px px-1 outline-none"
                        value={habit.title}
                        // onChange={e => { setHabitTitle(e.target.value)}}
                        autoFocus
                    ></input>
                ) : (
                    habit.title
                )}
                {rowState != 'editing' ? (<EditDeleteButtons habit={habit} setRowState={setRowState} />) : ''}
            </td>
            {[...Array(columns)].map((_, i) => (
                <TrackerCell
                    key={habit.id + i}
                    day={i}
                    habit={habit}
                />
            ))}
            <td className="border border-gray-300 text-13px text-center">{habit.goal}</td>
            <td className="border border-gray-300 text-13px text-center"></td>
        </tr>
    )
}

function AddHabitButton({setTableState}:{setTableState: (tableState: string) => void}) {
    return (
        <tr
            className="cursor-pointer"
            onClick={() => setTableState('adding-row')}
        >
            <td className="border border-gray-300 hover:bg-blue-500 hover:text-white text-blue-700 text-13px p-1 text-center font-bold truncate">
                + Add Habit
            </td>
        </tr>
    )
}

function EditDeleteButtons({
        habit,
        setRowState,
    }:{
        habit: HabitCombined,
        setRowState: (rowState: string) => void,
    }) {
    return (
        <span className="absolute right-0 top-0 bg-white hidden group-hover:block group-hover:bg-gray-100">
            <button
                className="text-13px p-1"
                onClick={()=>{setRowState('editing')}}
            >
                <PencilIcon className="w-4"/>
            </button>
            <button
                className="text-13px p-1"
            >
                <TrashIcon className="w-4"/>
            </button>
        </span>
    )
}