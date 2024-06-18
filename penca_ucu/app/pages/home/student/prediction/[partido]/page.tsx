'use server'
import React from 'react'
import Header from '@//ui/components/Header'
import { matchResponse, parseDate } from '@//lib/match'
import { getMatch } from '@//services/match'
import MakePrediction from '@//ui/components/MakePrediction'
import { getUserToken } from '@//services/tokenService'


export default async function PredictionPage({ params }: { params: { partido: string } }) {

    const username = await getUserToken()
    const partidoFromDb: matchResponse[] = await getMatch(params.partido)
    const partido = partidoFromDb[0]

    const date = parseDate(partido.fecha)
    const imgUrlEquipo1 = `/countries/${partido.equipo1}-flag.gif`
    const imgUrlEquipo2 = `/countries/${partido.equipo2}-flag.gif`

    return (
        <div className='landing-container'>
            <Header />
            <div className='row prediction-info-div'>
                <div className='col col-12 header-info'>
                    <h1>{date.date}</h1>
                </div>
                <div className='col col-12 teamInfo'>
                    <div className='row teams-info-div'>
                        <div className='col-3 prediction-column-div'>
                            <img className='flag-img' src={imgUrlEquipo1} alt="" />
                            <p>{partido.equipo1}</p>
                        </div>
                        <div className='col-3 prediction-column-div'>
                            <h1>VS</h1>
                            <p>{date.time}</p>
                        </div>
                        <div className='col-3 prediction-column-div'>
                            <img className='flag-img' src={imgUrlEquipo2} alt="" />
                            <p>{partido.equipo2}</p>
                        </div>

                    </div>
                </div>
                {/* <img className='prediction-info-img' src="/prediction-background.jpg" alt="" /> */}
            </div>
            <div className='col col-11 prediction-statistics-div'>
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
                                <h6>Empate</h6>
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
