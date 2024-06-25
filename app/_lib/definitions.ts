export type Habit = {
    "id": string,
    "title": string,
    "description": string,
    "userId": string,
}

export type HabitPeriod = {
    "id": string,
    "habitId": string,
    "startDate": string,
    "endDate": string,
    "goal": number,
}

export type HabitCombined = {
    "id": string,
    "title": string,
    "description": string,
    "userId": string,
    "startDate": string,
    "endDate": string,
    "goal": number,
}

export type User = {
    "id": string,
    "firstName": string,
    "lastName": string,
    "email": string,
    "password": string,
}