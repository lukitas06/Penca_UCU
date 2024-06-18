'use client';


export default function SelectForm({ teams }: { teams: any; }) {
    const teamsOptions = teams.map((team: any) =>
        <option value={team.name}>{team.name}</option>
    );

    return (

        <select className="form-select">
            {teamsOptions}
        </select>

    );
}