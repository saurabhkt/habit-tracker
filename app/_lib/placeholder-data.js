const users = [
    {
        "id": "410544b2-4001-4271-9855-fec4b6a6442a",
        "firstName": "Saurabh",
        "lastName": "KT",
        "email": "saurabhkt.work@gmail.com",
        "password": "test1234",
    }
]

const habitsSampleData = [
    {
        "title": "Brush teeth",
        "description": "",
        "doneDates": ["2024-05-01", "2024-05-02", "2024-05-03", "2024-05-04", "2024-05-05", "2024-05-06", "2024-05-07", "2024-05-08", "2024-05-09", "2024-05-10", "2024-05-11", "2024-05-12", "2024-05-13", "2024-05-14", "2024-05-15", "2024-05-16", "2024-05-17"],
        "goal": 25,
        "notes": "",
        "userId": users[0].id,
    },
    {
        "title": "Yoga",
        "description": "",
        "doneDates": ["2024-05-01", "2024-05-02", "2024-05-03", "2024-05-08", "2024-05-09", "2024-05-10", "2024-05-11", "2024-05-12"],
        "goal": 15,
        "notes": "",
        "userId": users[0].id,
    },
    {
        "title": "Read",
        "description": "",
        "doneDates": ["2024-05-01", "2024-05-02", "2024-05-03", "2024-05-15", "2024-05-16"],
        "goal": 15,
        "notes": "",
        "userId": users[0].id,
    },
]

module.exports = {
    habitsSampleData,
    users,
};