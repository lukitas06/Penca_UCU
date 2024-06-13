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

    if (view == "jugados") {
        return (
            <div className="col col-12 landing-container">
                <NavBar changeView={handleViewChange} />
                <div className="matchCard-container">
                    {matches.filter(match => match.finalizado).map(match =>
                        <MatchCard matchInfo={match} user={user} />)}
                </div>
            </div>
        )
    }
    else if (view == "proximos") {
        return (
            <div className="col col-12 landing-container">
                <NavBar changeView={handleViewChange} />
                <div className="matchCard-container">
                    {matches.filter(match => !match.finalizado).map(match =>
                        <MatchCard matchInfo={match} user={user} />)}
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