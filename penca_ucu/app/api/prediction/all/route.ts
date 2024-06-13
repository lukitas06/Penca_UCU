'use server';
import { connection } from '../../../lib/dbConnection';
import { UserResponse } from '@//lib/user';

export async function GET(req: any, res: any) {
    try {
        const { searchParams } = new URL(req.url);
        const id_partido = searchParams.get('id_partido');

        if (!id_partido) {
            return new Response(
                JSON.stringify({ message: 'Faltan parámetros' }),
                { status: 400 }
            );
        }

        const query = `SELECT * FROM Prediccion WHERE id_partido = ?`;
        const dbResponse = await checkPrediction(query, [id_partido]) as UserResponse[];

        if (dbResponse.length === 0) {
            return new Response(
                JSON.stringify({ message: 'Match not found' }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({ prediction: dbResponse[0] }),
            { status: 200 }
        );

    } catch (err) {
        return new Response(
            JSON.stringify({ message: 'Internal server error' }),
            { status: 500 }
        );
    }
}

const checkPrediction = (query: string, params: any[]): Promise<any> => {
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
