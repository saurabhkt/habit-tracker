const { db } = require('@vercel/postgres');
const {
    habitsSampleData,
    users
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`; // Create extension for UUID generation

        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS users (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                first_name VARCHAR(255) NOT NULL,
                last_name VARCHAR(255),
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            );
        `;

        console.log('Created "users" table');
        console.log(users);

        const insertedUsers = await Promise.all(
            users.map(async (user) => {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                return client.sql`
                    INSERT INTO users (id, first_name, last_name, email, password)
                    VALUES (${user.id}, ${user.firstName}, ${user.lastName}, ${user.email}, ${hashedPassword})
                    ON CONFLICT (id) DO NOTHING;
                `;
            }),
        );

        console.log(`Seeded ${insertedUsers.length} users`);

        return {
            createTable,
            users: insertedUsers,
        };
    } catch (error) {
        console.error('Error seeding users', error);
        return error;
    }
}

async function seedHabits(client) {
    try {
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS habits (
                title VARCHAR(255) NOT NULL,
                description TEXT,
                done_dates TEXT[] NOT NULL,
                goal INT NOT NULL,
                notes TEXT,
                user_id UUID
            );
        `;

        console.log('Created "habits" table');

        const insertedHabits = await Promise.all(
            habitsSampleData.map(async (habit) => {
                return client.sql`
                    INSERT INTO habits (title, description, done_dates, goal, notes, user_id)
                    VALUES (${habit.title}, ${habit.description}, ${habit.doneDates}, ${habit.goal}, ${habit.notes}, ${habit.userId});
                `;
            }),
        );

        console.log(`Seeded ${insertedHabits.length} habits`);

        return {
            createTable,
            habits: insertedHabits,
        };
    } catch (error) {
        console.error('Error seeding habits', error);
        return error;
    }
}

async function main() {
    const client = await db.connect();

    await seedUsers(client);
    await seedHabits(client);

    await client.end();
}

main().catch((err)=> {
    console.error('Error seeding database', err);
})