export function getFirstDayOfMonth(dt: Date) {
    dt.setDate(1);
    return dt;
}

export function getLastDayOfMonth(dt: Date) {
    dt.setMonth(dt.getMonth() + 1);
    dt.setDate(0);
    return dt;
}