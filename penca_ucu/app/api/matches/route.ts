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

export async function POST() {
    return NextResponse.json({ message: 'POST method not implemented' }, { status: 501 });
}

const getMatches = async (connection: PoolConnection): Promise<any> => {
    const QUERY = 'SELECT * FROM Partido;';
    const [results] = await connection.execute(QUERY);
    return results;
};
