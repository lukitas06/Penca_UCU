'use server';

import { connection } from '../../lib/dbConnection';
import { UserResponse } from '@//lib/user';

export async function POST(req: any, res: any) {
    try {
        const body = await req.json();
        const { usuario } = body;
        const query = `SELECT * FROM Usuario WHERE usuario = ?`;

        const dbResponse = await getUser(query, [usuario]) as UserResponse[];
        if (dbResponse.length === 0) {
            return new Response(
                JSON.stringify({ message: 'User not found' }),
                { status: 404 }
            );
        } else {
            return new Response(
                JSON.stringify({ user: dbResponse[0] }),
                {
                    headers: {
                        'Set-Cookie': `user=${usuario}`,
                        'Content-Type': 'application/json',
                    }
                }
            );
        }
    } catch (err) {
        return new Response(
            JSON.stringify({ message: err }),
            { status: 500 }
        );
    }
}

const getUser = (query: string, params: any[]) => {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (err, results) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(results);
        });
    });
};