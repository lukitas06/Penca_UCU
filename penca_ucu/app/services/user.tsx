'use server';

export async function getUsers() {
    return "not implemented";
}

export async function getUsersOrderedByPoints() {
    const users = await fetch("http://localhost:3000/api/users/ranking", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        credentials: 'include'
    });
    return users.json();
}

export async function getUser(username: string) {
    return "not implemented";
}

export async function createUser(username: string, password: string) {
    return "not implemented";
}

export async function updateUserScore(username: string, puntaje: number) {

    const url = `http://localhost:3000/api/users?username=${username}`;
    const data = { puntaje };
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(data)
    });
    return response.json();
}