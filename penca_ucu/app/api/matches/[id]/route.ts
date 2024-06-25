'use server';

import { withTransaction } from '@//lib/transactionMiddleware';
import { NextRequest, NextResponse } from 'next/server';
import { PoolConnection } from 'mysql2/promise';

export async function GET(req: NextRequest, { params }: { params: { id: string; }; }) {
    try {
        const id = params.id;
        if (id !== undefined) {
            return await withTransaction(async (connection: PoolConnection) => {
                const match = await getMatch(connection, id);
                return NextResponse.json(match, { status: 200 });
            });
        } else {
            return NextResponse.json({ message: 'ID is required' }, { status: 400 });
        }
    } catch (err) {
        return NextResponse.json({ message: err instanceof Error ? err.message : 'Unknown error' }, { status: 501 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string; }; }) {
    try {
        const id = params.id;
        const body = await req.json();
        const { equipo1_goles, equipo2_goles } = body;

        return await withTransaction(async (connection: PoolConnection) => {
            const query = `UPDATE Partido SET equipo1_goles = ?, equipo2_goles = ?, finalizado = ? WHERE id = ?`;
            const dbResponse = await updateMatch(connection, query, [equipo1_goles, equipo2_goles, true, id]);
            return NextResponse.json(dbResponse, { status: 200 });
        });
    } catch (err) {
        return NextResponse.json({ message: err instanceof Error ? err.message : 'Unknown error' }, { status: 501 });
    }
}

const updateMatch = async (connection: PoolConnection, query: string, params: any[]): Promise<any> => {
    const [result] = await connection.execute(query, params);
    return result;
};

const getMatch = async (connection: PoolConnection, id: string): Promise<any> => {
    const QUERY = `SELECT * FROM Partido WHERE id = ?`;
    const [results] = await connection.execute(QUERY, [id]);
    return results;
};
