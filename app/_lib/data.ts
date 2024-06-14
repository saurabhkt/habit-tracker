import { Habit } from "./definitions"
import { sql } from "@vercel/postgres";
import { auth } from "@/auth";

export async function fetchHabits(): Promise<Habit[]> {
    
    const session = await auth();
    const userId = session?.user?.id;

    try {
        const data = await sql`SELECT * FROM habits where user_id = ${userId} `;
        
        const habits: Habit[] = data.rows.map(row => ({
            title: row.title,
            description: row.description,
            doneDates: row.done_dates,
            goal: row.goal,
            notes: row.notes,
            userId: row.user_id,
        }));

        return habits;
    }
    catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch habits.');
    }
}