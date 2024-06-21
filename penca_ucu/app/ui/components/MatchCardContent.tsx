'use client'
import { matchResponse, parseDate } from "@//lib/match"
import { predictionResponse } from "@//lib/prediction"
import { useRouter } from "next/router"

type predictionHashMap = {
    id: string,
    prediction: predictionResponse,

}

export const PredictedAndNotFinalized = ({ matchInfo, prediction }: { matchInfo: matchResponse, prediction: predictionHashMap | undefined }) => {
    const { id, equipo1, equipo2, etapa, fecha } = matchInfo

    const parsedFecha = parseDate(fecha)

    const imgUrlEquipo1 = `/countries/${equipo1}-flag.gif`
    const imgUrlEquipo2 = `/countries/${equipo2}-flag.gif`

    return (
        <div className="col-8 col-md-3 card text-center">

            <div className="card-header">
                Mi predicción
                <EditPredictBtn matchId={id} />
                {/* <ChargeResultBtn matchId={id} goles_equipo1={6} goles_equipo2={0} /> */}
            </div>
            <div className="card-body">
                <div className="teamInfo">
                    <img className="flag-img" src={imgUrlEquipo1} alt="" />

                    <p>{equipo1}</p>
                </div>
                <div className="goals-card-column">
                    <h3>{prediction?.prediction.equipo1_goles}</h3>
                    <h3>-</h3>
                    <h3>{prediction?.prediction.equipo2_goles}</h3>
                </div>
                <div className="teamInfo">
                    <img className="flag-img" src={imgUrlEquipo2} alt="" />

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

export const PredictedAndFinalized = ({ matchInfo, prediction }: { matchInfo: matchResponse, prediction: predictionHashMap | undefined }) => {

    const { id, equipo1, equipo2, equipo1_goles, equipo2_goles, etapa } = matchInfo

    return (
        <div className="col-8 col-md-3 card text-center match-card">
            <div className="card-header">Partido finalizado

            </div>
            <div className="card-body card-body-div">
                <div className="card-body-row">

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
                <p>Mi prediccion:</p>
                <div className="card-body-row">
                    <div className="teamInfo">
                        <p>{equipo1}</p>
                    </div>
                    <div className="goles-div">
                        <h2>{prediction?.prediction.equipo1_goles} - {prediction?.prediction.equipo2_goles}</h2>
                    </div>
                    <div className="teamInfo">
                        <p>{equipo2}</p>
                    </div>
                </div>
            </div>
            <div className="card-footer ">
                {etapa}
            </div>
        </div>
    )
}

export const NotPredictedAndFinalized = ({ matchInfo }: { matchInfo: matchResponse }) => {

    const { id, equipo1, equipo2, equipo1_goles, equipo2_goles, etapa, fecha } = matchInfo

    return (
        <div className="col-8 col-md-3 card text-center match-card">
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

export const NotPredictedAndNotFinalized = ({ matchInfo }: { matchInfo: matchResponse }) => {

    const { id, equipo1, equipo2, equipo1_goles, equipo2_goles, etapa, fecha, finalizado } = matchInfo

    const parsedFecha = parseDate(fecha)

    const imgUrlEquipo1 = `/countries/${equipo1}-flag.gif`
    const imgUrlEquipo2 = `/countries/${equipo2}-flag.gif`

    return (
        <div className="col-8 col-md-3 card card-container text-center">

            <div className="card-header">
                <div>{parsedFecha.date}</div>
                <div>{parsedFecha.time}</div>

            </div>
            <div className="card-body">
                <div className="teamInfo">
                    <img className="flag-img" src={imgUrlEquipo1} alt="" />
                    <p>{equipo1}</p>
                </div>
                <PredictButton matchId={id} />
                <div className="teamInfo">
                    <img className="flag-img" src={imgUrlEquipo2} alt="" />
                    <p>{equipo2}</p>
                </div>
            </div>
            <div className="card-footer">
                {etapa}
            </div>
        </div>
    )
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

export function EditPredictBtn({ matchId }: { matchId: string }) {

    const router = useRouter()

    const goPredict = (matchId: string) => {
        router.push(`/pages/home/student/prediction/${matchId}`)
    }
    return (
        <button className="btn btn-primary predict-btn" onClick={() => goPredict(matchId)} >Editar</button>
    )
}