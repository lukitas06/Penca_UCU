'use server';

import { predictionResponse } from "../lib/prediction";
import { updateUserScore } from "@//services/user";
import { updateMatch } from "./match";

export async function getAllPredictions() {
    //cositas
}

export async function getPredictionsByUser(usuario: string) {
    const url = `http://localhost:3001/api/prediction?usuario=${usuario}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    });
    return await response.json();
}


export async function getPredictionsByMatch(id_partido: string) {
    //cositas
    const url = `http://localhost:3001/api/prediction/all?id_partido=${id_partido}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    });
    return await response.json();
}

export async function getPredictionsByUserAndMatch(id_partido: string, usuario: string) {

    const url = `http://localhost:3001/api/prediction/${id_partido}/${usuario}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    });
    const data = await response.json();
    return data;

}

export async function makePrediction(goalsEquipo1: number, goalsEquipo2: number, usuario: string, id_partido: string) {

    try {
        const equipo1_goles = goalsEquipo1;
        const equipo2_goles = goalsEquipo2;

        if (equipo1_goles === null || equipo2_goles === null) {
            return { message: 'Faltan parámetros' };
        }
        else {
            const url = "http://localhost:3001/api/prediction";
            const data = { equipo1_goles, equipo2_goles, usuario, id_partido };
            const response = fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            return (await response).json();
        }
    }
    catch (error) {
        return { message: error };
    }
}

export async function updatePrediction(id_partido: string, equipo1_goles: number, equipo2_goles: number) {

    const prueba = [];
    console.log("update prediction", prueba.length);
    try {
        const predictions: predictionResponse[] = await getPredictionsByMatch(id_partido);

        if (predictions.length === 0) {
            return { message: 'No hay predicciones para este partido' };
        }
        for (const prediction of predictions) {

            console.log("prediction user", prediction.usuario);
            const puntaje = setPredictionScore(prediction, equipo1_goles, equipo2_goles);

            const url = `http://localhost:3001/api/prediction/${id_partido}/${prediction.usuario}`;

            const updatedPrediction = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ puntaje })
            });

            await updatedPrediction.json();

            await updateUserScore(prediction.usuario, puntaje);

        }
        await updateMatch(id_partido, equipo1_goles, equipo2_goles);

        return { message: "Predicciones actualizadas" };

    } catch (error) {
        return { message: error };
    }
}

const setPredictionScore = (prediction: predictionResponse, equipo1_goles_terminado: number, equipo2_goles_terminado: number) => {
    let puntaje = 0;

    console.log("terminado", equipo1_goles_terminado, equipo2_goles_terminado);
    console.log("prediction", prediction.equipo1_goles, prediction.equipo2_goles);
    if (prediction.equipo1_goles === equipo1_goles_terminado && prediction.equipo2_goles === equipo2_goles_terminado) {
        console.log("acerto resultado");
        puntaje = 4;
    } else if (
        (equipo1_goles_terminado > equipo2_goles_terminado && prediction.equipo1_goles > prediction.equipo2_goles) ||
        (equipo1_goles_terminado < equipo2_goles_terminado && prediction.equipo1_goles < prediction.equipo2_goles) ||
        (equipo1_goles_terminado === equipo2_goles_terminado && prediction.equipo1_goles === prediction.equipo2_goles)
    ) {
        puntaje = 2;
    }
    return puntaje;
};