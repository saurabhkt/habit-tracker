'use client';

import { Habit as habitType, HabitCombined, HabitPeriod } from "../../_lib/definitions"
import { TrackerCell } from "./tracker-cell"
import { useState } from "react";
import { createHabit } from "@/app/_lib/actions";
import { getFirstDayOfMonth, getLastDayOfMonth } from "@/app/_lib/utils";

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
    const [isAddingHabit, setIsAddingHabit] = useState(false);

    const [habitTitle, setHabitTitle] = useState('');
    const [habitGoal, setHabitGoal] = useState(0);

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
                                key={habit.id}
                            />
                        )
                    })}
                    { isAddingHabit? (
                        <>
                        <NewHabitRow columns={numOfCols} habitTitle={habitTitle} habitGoal={habitGoal} setHabitTitle={setHabitTitle} setHabitGoal={setHabitGoal} />
                        <SaveCancelHabitButtons habitTitle={habitTitle} habitGoal={habitGoal} setIsAddingHabit={setIsAddingHabit} />
                        </>
                        ) : (
                        <AddHabitButton setIsAddingHabit={setIsAddingHabit} />
                        )}
                </tbody>
            </table>
        </div>
    )
}

function TableRow({
    habit,
    columns,
}: {
    habit: HabitCombined,
    columns: number,
})  {
    return (
        <tr>
            <td className="border border-gray-300 bg-gray-200 text-13px px-1 text-left truncate">{habit.title}</td>
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

function AddHabitButton({setIsAddingHabit}:{setIsAddingHabit: (isAddingHabit: boolean) => void}) {
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
    habitTitle,
    habitGoal,
    setHabitTitle,
    setHabitGoal,
}: {
    columns: number,
    habitTitle: string,
    habitGoal: number,
    setHabitTitle: (title: string) => void,
    setHabitGoal: (goal: number) => void,
}) {
    return (
        <tr>
            <td className="border border-gray-300">
                <input
                    type="text"
                    className="w-full text-13px px-1"
                    value={habitTitle}
                    onChange={e => { setHabitTitle(e.target.value)}}
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
                    className="w-full text-13px px-1 text-center"
                    value={habitGoal}
                    onChange={e => { setHabitGoal(Number(e.target.value))}}
                ></input>
            </td>
            <td className="border border-gray-300 text-13px text-center">
            </td>
        </tr>
    )
}

function SaveCancelHabitButtons({
        habitTitle,
        habitGoal,
        setIsAddingHabit,
    }:{
        habitTitle: string,
        habitGoal: number,
        setIsAddingHabit: (isAddingHabit: boolean) => void,
    }) {
    return (
        <tr>
            <td className="p-0 border border-gray-300">
                <button
                    className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white text-13px text-center font-bold py-1 w-1/2"
                    onClick={() => {
                        saveHabit(habitTitle, habitGoal);
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

function saveHabit(habitTitle: string, habitGoal: number) {

    const habit: habitType = {
        title: habitTitle,
        description: "",
        userId: "",
        id: "",
    };

    const habitPeriod: HabitPeriod = {
        id: "",
        habitId: "",
        startDate: getFirstDayOfMonth(new Date()).toISOString().slice(0, 10),
        endDate: getLastDayOfMonth(new Date()).toISOString().slice(0, 10),
        goal: habitGoal,
    }

    createHabit(habit, habitPeriod);
}

