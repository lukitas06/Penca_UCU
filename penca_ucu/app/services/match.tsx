'use server';

import { matchResponse } from "@//lib/match";

export async function getMatches(): Promise<matchResponse[]> {
    const matches = await fetch("http://localhost:3001/api/matches", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json',
        },

    });
    return matches.json();
}

export async function getMatch(matchId: string): Promise<matchResponse[]> {
    const dbResponse = await fetch(`http://localhost:3001/api/matches/${matchId}`);
    return dbResponse.json();
}

export async function updateMatch(matchId: string, equipo1_goles: number, equipo2_goles: number) {

    const dbResponse = await fetch(`http://localhost:3001/api/matches/${matchId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ equipo1_goles, equipo2_goles })
    });
    return dbResponse.json();
}

export async function createMatch(equipo1: string, equipo2: string, fecha: string, etapa: string) {
    const dbResponse = await fetch(`http://localhost:3001/api/matches`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ equipo1, equipo2, fecha, etapa })
    });
    return dbResponse.json();
}