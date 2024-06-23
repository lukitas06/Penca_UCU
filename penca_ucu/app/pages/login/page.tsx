'use server';

import LoginRegisterCard from "../../ui/components/LoginRegisterCard";

export default async function Login() {
    const teamsData = await fetchTeams();
    return (
        <LoginRegisterCard teams={teamsData} />
    );
}

const fetchTeams = async () => {
    try {
        const url = "http://localhost:3000/api/teams";
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },

        });
        if (response.status !== 200) {
            return { message: 'Error fetching teams' };
        }
        const data = await response.json();
        return data;

    } catch {
        return { message: 'Error fetching teams' };
    }
};