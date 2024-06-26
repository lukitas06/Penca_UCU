'use server';

import { withTransaction } from '@//lib/transactionMiddleware';
import { NextRequest, NextResponse } from 'next/server';
import { PoolConnection } from 'mysql2/promise';

export async function GET() {
    try {
        return await withTransaction(async (connection: PoolConnection) => {
            const matches = await getMatches(connection);
            return NextResponse.json(matches, { status: 200 });
        });
    } catch (err) {
        return NextResponse.json({ message: err instanceof Error ? err.message : 'Unknown error' }, { status: 501 });
    }
}

export async function POST(req: NextRequest) {

    const body = await req.json();
    console.log('POST body:', body);
    const { equipo1, equipo2, fecha, etapa } = body;
    const id = Math.floor(Math.random() * 1000);

    try {
        return await withTransaction(async (connection: PoolConnection) => {

            const QUERY = `INSERT INTO Partido (id, equipo1, equipo2, equipo1_goles, equipo2_goles, etapa, fecha, finalizado) VALUES (${id}, ?, ?, 0, 0, ?, ?, FALSE);`
            try {

                const result = await createMatch(connection, QUERY, [equipo1, equipo2, etapa, fecha]);
                return NextResponse.json({ message: result }, { status: 201 });
            }
            catch (err) {
                return NextResponse.json({ message: err instanceof Error ? err.message : 'Unknown error' }, { status: 501 });
            }
        })

    }
    catch (err) {
        return NextResponse.json({ message: err instanceof Error ? err.message : 'Unknown error' }, { status: 501 });
    }

}

const getMatches = async (connection: PoolConnection): Promise<any> => {
    const QUERY = 'SELECT * FROM Partido;';
    const [results] = await connection.execute(QUERY);
    return results;
};

const createMatch = async (connection: PoolConnection, QUERY: string, params: any[]): Promise<any> => {

    const [results] = await connection.execute(QUERY, params);
    return "Match created successfully";
}
