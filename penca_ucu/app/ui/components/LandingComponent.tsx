'use client'
import React, { useReducer } from "react"
import NavBar from "@//ui/components/NavBar"
import MatchCard from "@//ui/components/MatchCard"
import RankingCard from "./RankingCard"
import { matchResponse } from "@//lib/match"
import { RankingResponse } from "@//lib/user"

export default function LandingComponent({ matches, users }: { matches: matchResponse[], users: RankingResponse[] }) {

    console.log("users", users)
    const [view, setView] = React.useState("proximos")

    const handleViewChange = (viewParam: string) => {
        setView(viewParam)
        console.log("viewSetted", viewParam)
    }

    if (view == "jugados") {
        return (
            <div className="col col-12 landing-container">
                <NavBar changeView={handleViewChange} />
                <div className="matchCard-container">
                    {matches.filter(match => match.finalizado).map(match =>
                        <MatchCard matchInfo={match} />)}
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
                        <MatchCard matchInfo={match} />)}
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