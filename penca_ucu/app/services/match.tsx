'use server';

import { updateUserScore } from "@//services/user";
import { matchResponse } from "@//lib/match";
import { getPredictionsByMatch, setPredictionScore } from "./prediction";
import { predictionResponse } from "../lib/prediction";

export async function getMatches(): Promise<matchResponse[]> {
    const matches = await fetch("http://localhost:3000/api/matches", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json',
        },

    });
    return matches.json();
}

export async function getMatch(matchId: string): Promise<matchResponse[]> {
    const dbResponse = await fetch(`http://localhost:3000/api/matches/${matchId}`);
    return dbResponse.json();
}

export async function updateMatch(matchId: string, equipo1_goles: number, equipo2_goles: number) {
    if (equipo1_goles == null || equipo2_goles == null) {
        return { message: 'Error en los param. de goles' };
    }
    else {

        try {
            const dbResponse = await fetch(`http://localhost:3000/api/matches/${matchId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ equipo1_goles, equipo2_goles })
            });
            //console.log("RESP:",dbResponse.json())


            return dbResponse.json();


        }
        catch (error) {
            return { message: error };
        }

    }

}

export async function createMatch(equipo1: string, equipo2: string, fecha: string, etapa: string) {
    const dbResponse = await fetch(`http://localhost:3000/api/matches`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ equipo1, equipo2, fecha, etapa })
    });
    return dbResponse.json();
}

export async function UpdateAllUserScore(matchId: string, equipo1_goles: number, equipo2_goles: number) {
    try {
        const pred: predictionResponse[] = await getPredictionsByMatch(matchId)
        if (pred.length === 0) {
            return { message: "No hay predicciones para este partido" };
        }
        await Promise.all(pred.map(async (prediction) => {
            const user = prediction.usuario;
            const calcScore = await setPredictionScore(prediction, equipo1_goles, equipo2_goles)
            console.log("calcScore", calcScore)
            console.log("user", user)
            const res = await updateUserScore(user, calcScore)
        }))
        return { message: "Partido y usuarios actualizados" };

    } catch (error) {
        return { message: error };

    }
}

