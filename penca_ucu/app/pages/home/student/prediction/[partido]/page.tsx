'use server'
import React from 'react'
import Header from '@//ui/components/Header'
import { predictionResponse } from '@//lib/prediction'
import { matchResponse, parseDate } from '@//lib/match'
import MakePrediction from '@//ui/components/MakePrediction'
import { cookies } from 'next/headers'
import { verifyToken } from '@//services/tokenService'


export default async function PredictionPage({ params }: { params: { partido: string } }) {

    const username = await getUser()
    const partidoFromDb: matchResponse[] = await getMatch(params.partido)
    const partido = partidoFromDb[0]

    const date = parseDate(partido.fecha)

    return (
        <div className='landing-container'>
            <Header />s
            <div className='col col-12 prediction-info-div'>
                <div className='row header-info'>
                    <h1>{date.date}</h1>
                </div>
                <div className='row '>
                    <div className='teams-info-div'>
                        <div className='prediction-column-div'>
                            <p>{partido.equipo1}</p>
                        </div>
                        <div className='prediction-column-div'>
                            <h1>VS</h1>
                            <p>{date.time}</p>
                        </div>
                        <div className='prediction-column-div'>
                            <p>{partido.equipo2}</p>
                        </div>

                    </div>
                </div>
                <img className='prediction-info-img' src="/prediction-background.jpg" alt="" />
            </div>
            <div className='col col-10 prediction-statistics-div'>
                <div className='card prediction-statistics-card'>
                    <div className='card-header'>
                        <h3>Predicciones del partido</h3>
                    </div>
                    <div className='card-body'>
                        <div className='card-body-header'>
                            <h4>¿Quien ganará?</h4>
                            <p>Votos totales: 3453</p>
                        </div>
                        <div className='teams-prediction-porcentaje'>
                            <div className='porcentaje-div'>
                                <h6>{partido.equipo1}</h6>
                                <p>50%</p>
                            </div>
                            <div className='porcentaje-div'>
                                <h6>{partido.equipo2}</h6>
                                <p>50%</p>
                            </div>
                            <div className='porcentaje-div'>
                                <h6>{partido.equipo2}</h6>
                                <p>50%</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <MakePrediction partido={partido} user={username} />

        </div>
    )
}

const getMatch = async (matchId: string) => {
    const dbResponse = await fetch(`http://localhost:3000/api/matches/${matchId}`)
    return dbResponse.json()
}

const getUser = async () => {
    const token = cookies().get('token')
    if (token !== undefined) {
        const tokenItself = token.value
        const payload = await verifyToken(tokenItself)
        if (payload !== false) {
            return payload.username
        }
        return ""
    }
    return ""
}

const mockPredicts: predictionResponse[] = [
    {
        usuario: "usuario1",
        id_partido: "1",
        equipo1_goles: 1,
        equipo2_goles: 2,
        puntaje: 0
    },
    {
        usuario: "usuario2",
        id_partido: "2",
        equipo1_goles: 2,
        equipo2_goles: 2,
        puntaje: 0
    },
    {
        usuario: "usuario3",
        id_partido: "2",
        equipo1_goles: 3,
        equipo2_goles: 1,
        puntaje: 0
    },
    {
        usuario: "usuario4",
        id_partido: "1",
        equipo1_goles: 1,
        equipo2_goles: 1,
        puntaje: 0
    }

]
