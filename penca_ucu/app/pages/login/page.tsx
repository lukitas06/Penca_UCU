'use server'
import LoginRegisterCard from "../../ui/components/LoginRegisterCard"


export default async function Login() {

    const teamsData = await fetchTeams()
    return (
        <LoginRegisterCard teams={teamsData} />
    )

}
const fetchTeams = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/teams');
        if (response.status !== 200) {
            return { message: 'Error fetching teams' };
        }
        return response.json()

    } catch {
        return { message: 'Error fetching teams' };
    }
};