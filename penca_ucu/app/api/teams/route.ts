'use server';

import { withTransaction } from '@//lib/transactionMiddleware';
import { NextRequest, NextResponse } from 'next/server';
import { PoolConnection } from 'mysql2/promise';

export async function GET(req: NextRequest) {
    try {
        return await withTransaction(async (connection: PoolConnection) => {
            const teams = await getTeams(connection);
            return NextResponse.json(teams, { status: 200 });
        });
    } catch (err) {
        return NextResponse.json(
            { message: err instanceof Error ? err.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

export async function POST() {
    return NextResponse.json({ message: 'POST method not implemented' }, { status: 501 });
}

const getTeams = async (connection: PoolConnection): Promise<any> => {
    const QUERY = 'SELECT * FROM Equipo';
    const [results] = await connection.execute(QUERY);
    return results;
};
