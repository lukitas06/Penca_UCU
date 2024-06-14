'use client'
import { matchResponse, parseDate } from "@//lib/match"
import { predictionResponse } from "@//lib/prediction"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import "../styles/MatchCard.css"


export default function MatchCard({ matchInfo, user }: { matchInfo: matchResponse, user: string }) {
    const { id, equipo1, equipo2, equipo1_goles, equipo2_goles, etapa, fecha, finalizado } = matchInfo
    const [predicted, setPredicted] = useState(false)
    const [predictedMatch, setPredictedMatch] = useState({} as predictionResponse)
    const [loading, setLoading] = useState(false)

    const parsedFinalizado = finalizado === 1 ? true : false
    const parsedFecha = parseDate(fecha)

    console.log("matchcard", equipo1, equipo2, predicted, parsedFinalizado)
    useEffect(() => {
        setLoading(true)
        checkPredicted(id, user).
            then((res) => {
                if (res.length > 0) {
                    setPredicted(true)
                    setPredictedMatch(res[0])
                }
                setLoading(false)
            })
    }, [])



    if (!predicted && !parsedFinalizado) {
        return (
            <div className="col-8 col-md-3 card card-container text-center">
                {loading && <div>Loading...</div>}

                <div className="card-header">
                    <div>{parsedFecha.date}</div>
                    <div>{parsedFecha.time}</div>

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
    else if (predicted && !parsedFinalizado) {
        return (
            <div className="card text-center">
                {loading && <div>Loading...</div>}

                <div className="card-header">
                    Mi predicción
                    <EditPredict matchId={id} />

                </div>
                <div className="card-body">
                    <div className="teamInfo">
                        <p>{equipo1}</p>
                    </div>
                    <div className="goals-card-column">
                        <h3>{predictedMatch.equipo1_goles}</h3>
                        <h3>-</h3>
                        <h3>{predictedMatch.equipo2_goles}</h3>
                    </div>
                    <div className="teamInfo">
                        <p>{equipo2}</p>
                    </div>
                </div>
                <div className="card-footer">
                    <div>{parsedFecha.date}</div>
                    <div>{etapa}</div>

                </div>
            </div>
        )
    }
    else if (parsedFinalizado) {
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
        router.push(`/pages/home/student/prediction/${matchId}`)
    }

    return (
        <button className="btn btn-primary predict-btn" onClick={() => goPredict(matchId)} >Predecir</button>

    )
}

export function EditPredict({ matchId }: { matchId: string }) {

    const router = useRouter()

    const goPredict = (matchId: string) => {
        router.push(`/pages/home/student/prediction/${matchId}`)
    }
    return (
        <button className="btn btn-primary predict-btn" onClick={() => goPredict(matchId)} >Editar</button>
    )
}

const checkPredicted = async (id: string, user: string) => {
    const url = `http://localhost:3000/api/prediction/${id}/${user}`
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })
    const data = await response.json()
    return data;
}


