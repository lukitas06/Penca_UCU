'use server'

import React from "react"
import NavBar from "@//ui/components/NavBar"
import MatchCard from "@//ui/components/MatchCard"
import { matchResponse } from "@//lib/match"


export default async function Landing() {
    return (
        <div>
            {/* Especie de header. Despues crear un componente para esto */}
            <div id="primary-header">
                <h1>Penca UCU Landing</h1>
            </div>
            <NavBar />
            <div className="matchCard-container">
                {mockMatches.map((match) =>
                    <MatchCard matchInfo={match} />
                )}

            </div>
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