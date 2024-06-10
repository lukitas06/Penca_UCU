'use server'

import React from "react"
import { matchResponse } from "@//lib/match"
import { RankingResponse } from "@//lib/user";
import LandingComponent from "@//ui/components/LandingComponent";
import Header from "@//ui/components/Header";

export default async function LandingPage() {

    const usersFromDb: RankingResponse[] = await getUsersOrderedByPoints()

    return (
        <div>
            <Header />
            <LandingComponent matches={mockMatches} users={usersFromDb} />
        </div>
    )
}

const mockMatches: matchResponse[] = [
    {
        id: "1",
        equipo1: "Equipo 1",
        equipo2: "Equipo 2",
        equipo1_goles: 1,
        equipo2_goles: 2,
        etapa: "Grupos",
        fecha: "01/01/2021",
        finalizado: false
    },
    {
        id: "2",
        equipo1: "Equipo 3",
        equipo2: "Equipo 4",
        equipo1_goles: 2,
        equipo2_goles: 2,
        etapa: "Grupos",
        fecha: "02/01/2021",
        finalizado: true
    },
    {
        id: "3",
        equipo1: "Equipo 5",
        equipo2: "Equipo 6",
        equipo1_goles: 3,
        equipo2_goles: 1,
        etapa: "Grupos",
        fecha: "03/01/2021",
        finalizado: false
    }
]

const getUsersOrderedByPoints = async () => {

    const users = await fetch("http://localhost:3000/api/users/ranking")
    return users.json()
}