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
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return JSON.stringify(response);
    }
    catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
};