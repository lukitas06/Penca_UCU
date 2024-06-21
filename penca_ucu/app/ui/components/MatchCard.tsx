'use client'
import { matchResponse } from "@//lib/match"
import { predictionResponse } from "@//lib/prediction"
import { useRouter } from "next/navigation"
import { updatePrediction } from "@//services/prediction"
import "../styles/MatchCard.css"

import {
    PredictedAndFinalized,
    PredictedAndNotFinalized,
    NotPredictedAndFinalized,
    NotPredictedAndNotFinalized
} from "./MatchCardContent";

type predictionHashMap = {
    id: string,
    prediction: predictionResponse,

};

export default function MatchCard({ matchInfo, predicted, prediction }: { matchInfo: matchResponse, predicted: boolean, prediction: predictionHashMap | undefined }) {
    const { finalizado } = matchInfo

    const status = getStatus(finalizado, predicted)

    //const MatchCardComponent = matchContentMap[status]

    switch (status) {
        case "predictedAndFinalized":
            return <PredictedAndFinalized matchInfo={matchInfo} prediction={prediction} />
        case "predictedAndNotFinalized":
            return <PredictedAndNotFinalized matchInfo={matchInfo} prediction={prediction} />
        case "notPredictedAndFinalized":
            return <NotPredictedAndFinalized matchInfo={matchInfo} />
        case "notPredictedAndNotFinalized":
            return <NotPredictedAndNotFinalized matchInfo={matchInfo} />
        default:
            return <div>Error</div>
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
    console.log("Respuesta matchcard cargarResultado", response)
}

const getStatus = (finalizado: number, predicted: boolean) => {
    if (finalizado === 1) {
        if (predicted) {
            return "predictedAndFinalized"
        } else {
            return "notPredictedAndFinalized"
        }
    } else {
        if (predicted) {
            return "predictedAndNotFinalized"
        } else {
            return "notPredictedAndNotFinalized"
        }
    }
}


