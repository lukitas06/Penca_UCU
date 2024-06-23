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
    NotPredictedAndNotFinalized,
    AdminAndNotFinalized,
    AdminAndFinalized,
} from "./MatchCardContent";

type predictionHashMap = {
    id: string,
    prediction: predictionResponse,

};

export default function MatchCard({ matchInfo, predicted, prediction, rol }: { matchInfo: matchResponse, predicted: boolean, prediction: predictionHashMap | undefined, rol: string }) {
    const { finalizado } = matchInfo

    const status = getStatus(finalizado, predicted)

    //const MatchCardComponent = matchContentMap[status]
    if (rol === "alumno") {

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
    else {
        console.log("entro a rol admin ", rol)
        console.log("finalizado ", finalizado)
        switch (finalizado) {
            case 1:
                return <AdminAndFinalized matchInfo={matchInfo} />
            case 0:
                return <AdminAndNotFinalized matchInfo={matchInfo} />
            default:
                return <div>Error</div>
        }
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


