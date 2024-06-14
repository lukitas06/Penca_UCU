'use client'
import React, { use } from "react"
import NavBar from "@//ui/components/NavBar"
import MatchCard from "@//ui/components/MatchCard"
import RankingCard from "./RankingCard"
import { matchResponse } from "@//lib/match"
import { RankingResponse } from "@//lib/user"

export default function LandingComponent({ matches, users, user }: { matches: matchResponse[], users: RankingResponse[], user: string }) {

    const [view, setView] = React.useState("proximos")

    const handleViewChange = (viewParam: string) => {
        setView(viewParam)
    }

    const partidosGrupoA = matches.filter(match => match.grupo === 'A')
    const partidosGrupoB = matches.filter(match => match.grupo === 'B')
    const partidosGrupoC = matches.filter(match => match.grupo === 'C')
    const partidosGrupoD = matches.filter(match => match.grupo === 'D')



    if (view == "jugados") {
        return (
            <div className="col col-12 landing-container">
                <NavBar changeView={handleViewChange} />
                <div className="matchCard-container">
                    <h5>Grupo A</h5>
                    {partidosGrupoA.filter(match => match.finalizado).map(match =>
                        <MatchCard matchInfo={match} user={user} />)}
                    <h5>Grupo B</h5>
                    {partidosGrupoB.filter(match => match.finalizado).map(match =>
                        <MatchCard matchInfo={match} user={user} />)}

                    <h5>Grupo C</h5>
                    {partidosGrupoC.filter(match => match.finalizado).map(match =>
                        <MatchCard matchInfo={match} user={user} />)}
                    <h5>Grupo D</h5>
                    {partidosGrupoD.filter(match => match.finalizado).map(match =>
                        <MatchCard matchInfo={match} user={user} />)}
                </div>
            </div>
        )
    }
    else if (view == "proximos") {
        return (
            <div className="col col-12 landing-container">
                <NavBar changeView={handleViewChange} />
                <div className="col col-12 matchCard-container">
                    <h5>Grupo A</h5>
                    <div className="row match-group-container">
                        {partidosGrupoA.filter(match => !match.finalizado).map(match =>
                            <MatchCard matchInfo={match} user={user} />)}
                    </div>
                    <h5>Grupo B</h5>
                    <div className="row match-group-container">
                        {partidosGrupoB.filter(match => !match.finalizado).map(match =>
                            <MatchCard matchInfo={match} user={user} />)}
                    </div>
                    <h5>Grupo C</h5>
                    <div className="row match-group-container">
                        {partidosGrupoC.filter(match => !match.finalizado).map(match =>
                            <MatchCard matchInfo={match} user={user} />)}
                    </div>
                    <h5>Grupo D</h5>
                    <div className="row match-group-container">
                        {partidosGrupoD.filter(match => !match.finalizado).map(match =>
                            <MatchCard matchInfo={match} user={user} />)}
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="col col-12 landing-container">
                <NavBar changeView={handleViewChange} />
                <RankingCard header={["Posicion", "Usuario", "Puntos"]} users={users} />
            </div>
        )

    }


}