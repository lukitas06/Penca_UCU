'use server'

export async function getUsers() {
    return "not implemented"
}

export async function getUsersOrderedByPoints() {
    const users = await fetch("http://localhost:3001/api/users/ranking", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        credentials: 'include'
    })
    return users.json()
}