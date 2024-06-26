'use server';

import { withTransaction } from '@//lib/transactionMiddleware';
import { NextRequest, NextResponse } from 'next/server';
import { PoolConnection } from 'mysql2/promise';
import { UserResponse } from '@//lib/user';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { usuario } = body;
        const query = `SELECT * FROM Usuario WHERE usuario = ?`;

        return await withTransaction(async (connection: PoolConnection) => {
            const dbResponse = await getUser(connection, query, [usuario]) as UserResponse[];
            if (dbResponse.length === 0) {
                return NextResponse.json(
                    { message: 'User not found' },
                    { status: 404 }
                );
            } else {
                return NextResponse.json(
                    { user: dbResponse[0] },
                    {
                        headers: {
                            'Set-Cookie': `user=${usuario}`,
                            'Content-Type': 'application/json',
                        }
                    }
                );
            }
        });
    } catch (err) {
        return NextResponse.json(
            { message: err instanceof Error ? err.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

const getUser = async (connection: PoolConnection, query: string, params: any[]): Promise<UserResponse[]> => {
    const [results] = await connection.execute(query, params);
    return results as UserResponse[];
};
