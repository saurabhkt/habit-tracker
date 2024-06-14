export type Habit = {
    "title": string,
    "description": string,
    "doneDates": string[],
    "goal": number,
    "notes": string,
    "userId": string,
}

export type User = {
    "id": string,
    "firstName": string,
    "lastName": string,
    "email": string,
    "password": string,
}