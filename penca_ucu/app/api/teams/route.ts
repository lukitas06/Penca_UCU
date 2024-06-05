'use server';
import { NextRequest } from 'next/server';
import { connection } from '../../lib/dbConnection';

export async function GET(req: NextRequest) {
    //call the provider or db to get the teams

    try {
        const cookies = req.cookies;
        const cookie = cookies.get('token') || "";

        if (cookie !== "") {
            const res = await getTeams();
            return Response.json(res);
        }
        else {
            return new Response(
                JSON.stringify({ message: 'Unauthorized' }),
                { status: 401 }
            );
        }

    } catch (err) {
        return new Response(
            JSON.stringify({ message: 'Internal server error' }),
            { status: 500 }
        );
    }
}

export async function POST() {
    return Response.json({ message: 'POST method not implemented' });
}

const getTeams = () => {

    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM Equipo', (err, results) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(results);
        });
    });
};
