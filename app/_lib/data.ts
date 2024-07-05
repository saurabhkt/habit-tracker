import { HabitCombined } from "./definitions"
import { sql } from "@vercel/postgres";
import { auth } from "@/auth";

export async function fetchHabits(): Promise<HabitCombined[]> {
    
    const session = await auth();
    const userId = session?.user?.id;

    try {
        const data = await sql `SELECT habits.id, habits.title, habits.description, habits.user_id, habit_periods.start_date, habit_periods.end_date, habit_periods.goal
        FROM habits
        JOIN habit_periods ON habits.id = habit_periods.habit_id
        WHERE habits.user_id = ${userId};`
        
        const habits: HabitCombined[] = data.rows.map(row => ({
            id: row.id,
            title: row.title,
            description: row.description,
            userId: row.user_id,
            startDate: row.start_date,
            endDate: row.end_date,
            goal: row.goal,

        }));

        // artificial delay to simulate network latency
        // await new Promise((resolve) => setTimeout(resolve, 6000));

        return habits;
    }
    catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch habits.');
    }
}