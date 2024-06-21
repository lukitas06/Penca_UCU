'use server';

import { connection } from '@//lib/dbConnection';
import { NextApiRequest } from 'next';

export async function GET(req: NextApiRequest,
    { params }: { params: { id: string; }; }) {

    try {
        const id = params.id;
        if (id !== undefined) {
            const match = await getMatch(id);
            return new Response(
                JSON.stringify(match),
                { status: 200 }
            );
        }
    }
    catch (err) {
        return new Response(
            JSON.stringify({ message: err }),
            { status: 501 }
        );
    }
}


export async function PUT(req: Request, { params }: { params: { id: string; }; }) {

    try {
        const id = params.id;
        const body = await req.json();
        const { equipo1_goles, equipo2_goles } = body;
        const query = `UPDATE Partido SET equipo1_goles = ?, equipo2_goles = ?, finalizado = ? WHERE id = ?`;
        const dbResponse = await updateMatch(query, [equipo1_goles, equipo2_goles, true, id]);
        return new Response(
            JSON.stringify(dbResponse),
            { status: 200 }
        );

    }
    catch (err) {
        return new Response(
            JSON.stringify({ message: err }),
            { status: 501 }
        );
    }
}

const updateMatch = (query: string, params: any[]): Promise<any> => {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });

};

const getMatch = (id: string) => {
    const QUERY = `SELECT * FROM Partido WHERE id = ${id};`;

    return new Promise((resolve, reject) => {
        connection.query(QUERY, (err, results) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(results);
        });
    }
    );
};