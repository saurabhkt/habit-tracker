'use client';

import { Habit as habitType, HabitCombined, HabitPeriod } from "../../_lib/definitions"
import { TrackerCell } from "./tracker-cell"
import { useState } from "react";
import { getLastDayOfMonth } from "@/app/_lib/utils";
import { NewHabitRow, SaveCancelHabitButtons } from "./tracker-new-habit-row";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

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
    
    const [selectedRow, setSelectedRow] = useState(-1);

    const [rowState, setRowState] = useState('');
    const [tableState, setTableState] = useState('');

    const [habitTitle, setHabitTitle] = useState('');
    const [habitGoal, setHabitGoal] = useState(0);

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
                                habit={habit}
                                columns={numOfCols}
                                index={i}
                                selectedRow={selectedRow}
                                setSelectedRow={setSelectedRow}
                                rowState={rowState}
                                setRowState={setRowState}
                            />
                        )
                    })}
                    { tableState == 'adding-row' ? (
                        <>
                        <NewHabitRow columns={numOfCols} habitTitle={habitTitle} habitGoal={habitGoal} setHabitTitle={setHabitTitle} setHabitGoal={setHabitGoal} />
                        <SaveCancelHabitButtons habitTitle={habitTitle} habitGoal={habitGoal} setTableState={setTableState} />
                        </>
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
    selectedRow,
    setSelectedRow,
    rowState,
    setRowState,
}: {
    habit: HabitCombined,
    columns: number,
    index: number,
    selectedRow: number,
    setSelectedRow: (selectedRow: number) => void,
    rowState: string,
    setRowState: (rowState: string) => void,
})  {

    function handleClick(e: React.MouseEvent) {

        if(rowState == 'editing-row' && selectedRow == index) {
            return;
        }
        else {
            if(e.detail > 1) {
                setSelectedRow(index);
                setRowState('editing-row');
            }
            else {
                selectedRow == index ? setSelectedRow(-1) : setSelectedRow(index);
                setRowState('');
            }
        }
    }

    return (
        <tr
            className={ selectedRow == index ? "border-2 border-blue-500" : "" }
        >
            <td
                className={
                    (rowState == 'editing-row' && selectedRow == index ? "bg-white" : "bg-gray-200 hover:bg-gray-100") +
                    " border border-gray-300 p-1 text-13px text-left truncate cursor-pointer relative"
                }
                onClick={handleClick}
            >
                {rowState == 'editing-row' && selectedRow == index ? (
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

