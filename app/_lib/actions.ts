'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { Habit as habitType, HabitPeriod } from './definitions';
import { sql } from '@vercel/postgres';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        const email = formData.get('email');
        const password = formData.get('password');
        await signIn('credentials', {email, password, redirectTo: DEFAULT_LOGIN_REDIRECT});
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials';
                default:
                    return 'Something went wrong.'
            }
        }
        throw error;
    }
}

export async function createHabit(
    habit: habitType,
    habitPeriod: HabitPeriod,
) {

    const session = await auth();
    habit.userId = session?.user?.id as string;

    try {
        // Begin transaction
        await sql`BEGIN`;

        // Insert into habits table and get the inserted id
        const habitResult: any = await sql`
            INSERT INTO habits (user_id, title, description)
            VALUES (${habit.userId}, ${habit.title}, ${habit.description})
            RETURNING id
        `;

        const habitId = habitResult.rows[0].id;

        // Insert into habit_periods table
        await sql`
            INSERT INTO habit_periods (habit_id, start_date, end_date, goal)
            VALUES (${habitId}, ${habitPeriod.startDate}, ${habitPeriod.endDate}, ${habitPeriod.goal})
        `;

        // Commit transaction
        await sql`COMMIT`;

    } catch(error) {
         // Rollback transaction in case of any errors
        await sql`ROLLBACK`;

        return {
            message: 'Database Error: Failed to create habit.',
        }
    }

    revalidatePath('/app/tracker');
    redirect('/app/tracker');
}