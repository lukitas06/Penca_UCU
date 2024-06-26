'use server';

import { withTransaction } from '@//lib/transactionMiddleware';
import { NextRequest, NextResponse } from 'next/server';
import { PoolConnection } from 'mysql2/promise';

export async function GET(req: NextRequest, { params }: { params: { idPartido: string, usuario: string; }; }) {
    try {
        const { idPartido, usuario } = params;
        if (!idPartido || !usuario) {
            return NextResponse.json({ message: 'Faltan parametros' }, { status: 400 });
        }

        return await withTransaction(async (connection: PoolConnection) => {
            const query = `SELECT * FROM Prediccion WHERE id_partido = ? AND usuario = ?`;
            const dbResponse = await getPredictionByUser(connection, query, [idPartido, usuario]);

            return NextResponse.json(dbResponse, { status: 200 });
        });
    } catch (error) {
        return NextResponse.json({ message: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { idPartido: string, usuario: string; }; }) {
    try {
        const { idPartido, usuario } = params;
        const body = await req.json();
        const { puntaje } = body;

        return await withTransaction(async (connection: PoolConnection) => {
            const query = `UPDATE Prediccion SET puntaje = ? WHERE id_partido = ? AND usuario = ?`;
            const dbResponse = await updatePrediction(connection, query, [puntaje, idPartido, usuario]);

            return NextResponse.json(dbResponse, { status: 200 });
        });
    } catch (error) {
        return NextResponse.json({ message: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }
}

const updatePrediction = async (connection: PoolConnection, query: string, params: any[]): Promise<any> => {
    const [result] = await connection.execute(query, params);
    return result;
};

const getPredictionByUser = async (connection: PoolConnection, query: string, params: any[]): Promise<any> => {
    const [result] = await connection.execute(query, params);
    return result;
};
