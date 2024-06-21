'use client';

import { matchResponse, parseDate } from "@//lib/match";
import { predictionResponse } from "@//lib/prediction";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { updatePrediction } from "@//services/prediction";
import "../styles/MatchCard.css";

type predictionHashMap = {
    id: string,
    prediction: predictionResponse,

};

export default function MatchCard({ matchInfo, predicted, prediction }: { matchInfo: matchResponse, predicted: boolean, prediction: predictionHashMap | undefined; }) {
    const { id, equipo1, equipo2, equipo1_goles, equipo2_goles, etapa, fecha, finalizado } = matchInfo;

    // console.log("predictionhash", prediction, equipo1, equipo2, " finalizado ", finalizado)

    const [loading, setLoading] = useState(false);

    const parsedFinalizado = finalizado === 1 ? true : false;
    const parsedFecha = parseDate(fecha);

    const imgUrlEquipo1 = `/countries/${equipo1}-flag.gif`;
    const imgUrlEquipo2 = `/countries/${equipo2}-flag.gif`;

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
        );
    }
    else if (predicted && !parsedFinalizado) {
        return (
            <div className="col-8 col-md-3 card text-center">
                {loading && <div>Loading...</div>}

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
        );
    }
    else if (predicted && parsedFinalizado) {
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
                    <p>Mi predicción:</p>
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
        );
    } else {
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
        );

    }
}

export function PredictButton({ matchId }: { matchId: string; }) {
    const router = useRouter();

    const goPredict = (matchId: string) => {
        router.push(`/pages/home/student/prediction/${matchId}`);
    };

    return (
        <button className="btn btn-primary predict-btn" onClick={() => goPredict(matchId)} >Predecir</button>

    );
}

export function EditPredictBtn({ matchId }: { matchId: string; }) {

    const router = useRouter();

    const goPredict = (matchId: string) => {
        router.push(`/pages/home/student/prediction/${matchId}`);
    };
    return (
        <button className="btn btn-primary predict-btn" onClick={() => goPredict(matchId)} >Editar</button>
    );
}

export function ChargeResultBtn({ matchId, goles_equipo1, goles_equipo2 }: { matchId: string, goles_equipo1: number, goles_equipo2: number; }) {

    return (
        <button className="btn btn-primary" onClick={() => goChargeResult(matchId, goles_equipo1, goles_equipo2)}>Cargar</button>
    );
}

const goChargeResult = async (matchId: string, goles_equipo1: number, goles_equipo2: number) => {
    console.log("cargando resultado matchcard", matchId, goles_equipo1, goles_equipo2);
    const response = await updatePrediction(matchId, goles_equipo1, goles_equipo2);
    console.log("Respuesta matchcard cargarResultado", response);
}


