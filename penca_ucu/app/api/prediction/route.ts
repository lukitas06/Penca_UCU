'use server';

import { withTransaction } from '@//lib/transactionMiddleware';
import { NextRequest, NextResponse } from 'next/server';
import { PoolConnection } from 'mysql2/promise';
import { predictionResponse } from '@//lib/prediction';
import { UserResponse } from '@//lib/user';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { usuario, id_partido } = body;

        if (!usuario || !id_partido) {
            return NextResponse.json({ message: 'Faltan parámetros' }, { status: 400 });
        }

        return await withTransaction(async (connection: PoolConnection) => {
            const query = `SELECT * FROM Prediccion WHERE usuario = ? AND id_partido = ?`;
            const dbResponse = await getPredictionFromUser(connection, query, [usuario, id_partido]) as UserResponse[];

            if (dbResponse.length === 0) {
                try {
                    const result = await createPrediction(connection, body);
                    return NextResponse.json({ message: result }, { status: 201 });
                } catch (err: any) {
                    return NextResponse.json({ message: err.message }, { status: 500 });
                }
            } else {
                try {
                    const result = await updatePrediction(connection, body);
                    return NextResponse.json({ message: result }, { status: 200 });
                } catch (err: any) {
                    return NextResponse.json({ message: err.message }, { status: 500 });
                }
            }
        });
    } catch (err) {
        return NextResponse.json({ message: err instanceof Error ? err.message : 'Unknown error' }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const usuario = searchParams.get('usuario');
        if (!usuario) {
            return NextResponse.json({ message: 'Faltan parámetros' }, { status: 400 });
        }

        return await withTransaction(async (connection: PoolConnection) => {
            const query = `SELECT * FROM Prediccion WHERE usuario = ?`;
            const dbResponse = await getPredictionFromUser(connection, query, [usuario]) as predictionResponse[];

            if (dbResponse.length === 0) {
                return NextResponse.json(dbResponse, { status: 404 });
            }

            return NextResponse.json(dbResponse, { status: 200 });
        });
    } catch (err) {
        return NextResponse.json({ message: err instanceof Error ? err.message : 'Unknown error' }, { status: 500 });
    }
}

const createPrediction = async (connection: PoolConnection, predictionData: any): Promise<string> => {
    const { usuario, id_partido, equipo1_goles, equipo2_goles } = predictionData;
    const QUERY = `INSERT INTO Prediccion (usuario, id_partido, equipo1_goles, equipo2_goles, puntaje) VALUES (?, ?, ?, ?, ${0})`;

    const [results] = await connection.execute(QUERY, [usuario, id_partido, equipo1_goles, equipo2_goles]);
    return "Prediction created successfully";
};

const updatePrediction = async (connection: PoolConnection, predictionData: any): Promise<string> => {
    const { usuario, id_partido, equipo1_goles, equipo2_goles } = predictionData;
    const QUERY = `UPDATE Prediccion SET equipo1_goles = ?, equipo2_goles = ? WHERE usuario = ? AND id_partido = ?`;

    const [results] = await connection.execute(QUERY, [equipo1_goles, equipo2_goles, usuario, id_partido]);
    return "Prediction updated successfully";
};

const getPredictionFromUser = async (connection: PoolConnection, query: string, params: any[]): Promise<any> => {
    const [results] = await connection.execute(query, params);
    return results;
};
