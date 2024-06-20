'use server'
import { connection } from '@//lib/dbConnection';

export async function GET(req: Request, { params }: { params: { idPartido: string, usuario: string } }) {

    try {

        const { idPartido, usuario } = params;
        if (!idPartido || !usuario) {
            return new Response(
                JSON.stringify({ message: 'Faltan parametros' }),
                { status: 400 }
            )
        }
        const query = `SELECT * FROM Prediccion WHERE id_partido = ? AND usuario = ?`;
        const dbResponse = await getPredictionByUser(query, [idPartido, usuario])

        return new Response(
            JSON.stringify(dbResponse),
            { status: 200 }
        )
    }
    catch (error) {
        return new Response(
            JSON.stringify({ message: error }),
            { status: 500 }
        )
    }

}


export async function PUT(req: Request, { params }: { params: { idPartido: string, usuario: string } }) {
    try {

        const { idPartido, usuario } = params;
        const body = await req.json();
        const { puntaje } = body;

        const query = `UPDATE Prediccion SET puntaje = ? WHERE id_partido = ? AND usuario = ?`;
        const dbResponse = await updatePrediction(query, [puntaje, idPartido, usuario])

        return new Response(
            JSON.stringify(dbResponse),
            { status: 200 }
        )
    }
    catch (error) {
        return new Response(
            JSON.stringify({ message: error }),
            { status: 500 }
        )
    }
}

const updatePrediction = (query: string, params: any[]): Promise<any> => {

    return new Promise((resolve, reject) => {
        connection.query(query, params, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    });
}

const getPredictionByUser = (query: string, params: any[]): Promise<any> => {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    });

}