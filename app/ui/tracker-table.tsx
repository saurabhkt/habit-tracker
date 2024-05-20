import { Habit as habitType } from "../lib/definitions"
import { TrackerCell } from "./tracker-cell"
import { fetchHabits } from "../lib/data"

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

export default function TableView({viewType}:{viewType: string}) {

    const habits = fetchHabits();
    const numOfCols = getNumOfCols(viewType);

    return (
        <div className="w-full">
            <table className="text-center text-black text-sm antialiased">
                <thead>
                    <tr>
                        <th className="border border-gray-300 text-blue-700 font-semibold min-w-48">Habit</th>
                        {[...Array(numOfCols)].map((_, i) => (
                            <th className="border border-gray-300 font-semibold bg-gray-200 text-13px w-6" key={i}>{i + 1}</th>
                        ))}
                        <th className="border border-gray-300 text-blue-700 font-semibold w-16">Goal</th>
                        <th className="border border-gray-300 text-blue-700 font-semibold w-16">Hit</th>
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
                </tbody>
            </table>
        </div>
    )
}

export function TableRow({
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
                    day={i}
                    habit={habit}
                />
            ))}
            <td className="border border-gray-300 text-13px text-center">{habit.goal}</td>
            <td className="border border-gray-300 text-13px text-center">{habit.notes}</td>
        </tr>
    )
}