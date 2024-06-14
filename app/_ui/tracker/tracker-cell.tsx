'use client';

import { ReactElement } from "react"
import { useState } from "react"
import { Habit as habitType } from "../../_lib/definitions"

export function TrackerCell(day: any, habit: habitType): ReactElement {

    const [cellStatus, setCellStatus] = useState(false);

    return (
        <td
            className={`${cellStatus? "bg-green-400": "hover:bg-gray-200"} border border-gray-300 text-center cursor-pointer`}
            onClick={()=>setCellStatus(!cellStatus)}
        >
        </td>
    )
}