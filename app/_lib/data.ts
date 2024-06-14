import { Habit } from "./definitions"
import { habitsSampleData } from './placeholder-data'

export function fetchHabits(): Habit[] {
    return habitsSampleData;
}