'use server';

import { withTransaction } from '@//lib/transactionMiddleware';
import { NextResponse } from 'next/server';
import { PoolConnection } from 'mysql2/promise';

export async function GET() {
    try {
        return await withTransaction(async (connection: PoolConnection) => {
            const dbResponse = await getOrderedUsers(connection);
            return NextResponse.json(dbResponse, { status: 200 });
        });
    } catch (err) {
        console.log(err);
        return NextResponse.json(
            { message: err instanceof Error ? err.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

const getOrderedUsers = async (connection: PoolConnection): Promise<any> => {
    const QUERY = `SELECT usuario, puntaje FROM Usuario where es_admin=0 ORDER BY puntaje DESC;`;
    const [results] = await connection.execute(QUERY);
    return results;
};
