'use server'
import React from 'react'
import Header from '@//ui/components/Header'
import { predictionResponse } from '@//lib/prediction'

export default async function PredictionPage({ params }: { params: { partido: string } }) {

    const totalPredictions = mockPredicts.filter(p => p.id_partido === params.partido)
    const partido = totalPredictions[0]
    return (
        <div>
            <Header />
            <div className='col col-12 prediction-info-div'>
                <div className='row header-info'>
                    <h1>Fecha</h1>
                </div>
                <div className='row '>
                    <div className='teams-info-div'>
                        <div className='team-info-div'>
                            <p>Equipo1</p>
                        </div>
                        <h1>VS</h1>

                        <div className='team-info-div'>
                            <p>Equipo2</p>
                        </div>

                    </div>
                </div>
            </div>
            <div className='card make-prediction-card'>

            </div>

        </div>
    )
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