'use server';

import { withTransaction } from '@//lib/transactionMiddleware';
import { NextRequest, NextResponse } from 'next/server';
import { PoolConnection } from 'mysql2/promise';
import { UserResponse } from '@//lib/user';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id_partido = searchParams.get('id_partido');

        console.log("id partido desde ruta", id_partido);

        if (!id_partido) {
            return NextResponse.json({ message: 'Faltan parámetros' }, { status: 400 });
        }

        return await withTransaction(async (connection: PoolConnection) => {
            const query = `SELECT * FROM Prediccion WHERE id_partido = ?`;
            const dbResponse = await checkPrediction(connection, query, [id_partido]) as UserResponse[];

            if (dbResponse.length === 0) {
                return NextResponse.json([], { status: 404 });
            }
            return NextResponse.json(dbResponse, { status: 200 });
        });
    } catch (err) {
        return NextResponse.json({ message: err instanceof Error ? err.message : 'Unknown error' }, { status: 500 });
    }
}

const checkPrediction = async (connection: PoolConnection, query: string, params: any[]): Promise<any> => {
    const [results] = await connection.execute(query, params);
    return results;
};
