import { useState } from "react"
import { TrackerCell } from "./tracker-cell"
import { Habit as habitType, HabitPeriod } from "@/app/_lib/definitions"
import { getFirstDayOfMonth, getLastDayOfMonth } from "@/app/_lib/utils"
import { createHabit } from "@/app/_lib/actions"

export function NewHabitRow({
    columns,
    setTableState,
}: {
    columns: number,
    setTableState: (tableState: string) => void,
}) {

    const [habitTitle, setHabitTitle] = useState('');
    const [habitGoal, setHabitGoal] = useState(0);

    return (
        <>
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
        <SaveCancelHabitButtons habitTitle={habitTitle} habitGoal={habitGoal} setTableState={setTableState} />
        </>
    )
}

export function SaveCancelHabitButtons({
        habitTitle,
        habitGoal,
        setTableState,
    }:{
        habitTitle: string,
        habitGoal: number,
        setTableState: (tableState: string) => void,
    }) {
    return (
        <tr>
            <td className="p-0 border border-gray-300">
                <button
                    className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white text-13px text-center font-bold py-1 w-1/2"
                    onClick={() => {
                        saveHabit(habitTitle, habitGoal);
                        setTableState('')}
                    }
                >
                Save
                </button>
                <button
                    className="hover:bg-gray-200 cursor-pointer text-13px text-center font-bold py-1 w-1/2"
                    onClick={() => {
                        setTableState('')}
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