'use client'
import { matchResponse } from "@//lib/match"
import { useState } from "react"
import { useRouter } from "next/navigation"
import "../styles/MatchCard.css"

export default function MatchCard({ matchInfo }: { matchInfo: matchResponse }) {
    const { id, equipo1, equipo2, equipo1_goles, equipo2_goles, etapa, fecha, finalizado } = matchInfo
    const [predicted, setPredicted] = useState(false)

    if (!predicted && !finalizado) {
        return (

            <div className="card text-center">
                <div className="card-header">{fecha}

                </div>
                <div className="card-body">
                    <div className="teamInfo">
                        <p>{equipo1}</p>
                    </div>
                    <PredictButton matchId={id} />
                    <div className="teamInfo">
                        <p>{equipo2}</p>
                    </div>
                </div>
                <div className="card-footer">
                    {etapa}
                </div>
            </div>
        )
    }
    else if (finalizado) {
        return (
            <div className="card text-center match-card">
                <div className="card-header">Resultado final

                </div>
                <div className="card-body">
                    <div className="teamInfo">
                        <p>{equipo1}</p>
                    </div>
                    <div className="goles-div">
                        <h2>{equipo1_goles} - {equipo2_goles}</h2>
                    </div>
                    <div className="teamInfo">
                        <p>{equipo2}</p>
                    </div>
                </div>
                <div className="card-footer ">
                    {etapa}
                </div>
            </div>
        )

    }
}

export function PredictButton({ matchId }: { matchId: string }) {
    const router = useRouter()

    const goPredict = (matchId: string) => {
        router.push(`/pages/home/student/prediction/${matchId}'`)
    }

    return (
        <button className="btn btn-primary predict-btn" onClick={() => goPredict(matchId)} >Predecir</button>

    )
}


