'use server';

import { predictionResponse } from '@//lib/prediction';
import { connection } from '../../lib/dbConnection';
import { UserResponse } from '@//lib/user';

export async function POST(req: any, res: any) {
    try {
        const body = await req.json();
        const { usuario, id_partido } = body;

        if (!usuario || !id_partido) {
            return new Response(
                JSON.stringify({ message: 'Faltan parámetros' }),
                { status: 400 }
            );
        }

        const query = `SELECT * FROM Prediccion WHERE usuario = ? AND id_partido = ?`;

        const dbResponse = await getPredictionFromUser(query, [usuario, id_partido]) as UserResponse[];

        if (dbResponse.length === 0) {
            try {
                const result = await createPrediction(body);
                return new Response(
                    JSON.stringify({ message: result }),
                    { status: 201 }
                );
            } catch (err: any) {
                return new Response(
                    JSON.stringify({ message: err.message }),
                    { status: 500 }
                );
            }
        } else {
            try {
                const result = await updatePrediction(body);
                return new Response(
                    JSON.stringify({ message: result }),
                    { status: 200 }
                );
            } catch (err: any) {
                return new Response(
                    JSON.stringify({ message: err.message }),
                    { status: 500 }
                );
            }
        }
    } catch (err) {
        return new Response(
            JSON.stringify({ message: err }),
            { status: 500 }
        );
    }
}

export async function GET(req: any, res: any) {
    try {
        const { searchParams } = new URL(req.url);
        const usuario = searchParams.get('usuario');
        if (!usuario) {
            return new Response(
                JSON.stringify({ message: 'Faltan parámetros' }),
                { status: 400 }
            );
        }

        const query = `SELECT * FROM Prediccion WHERE usuario = ?`;
        const dbResponse = await getPredictionFromUser(query, [usuario]) as predictionResponse[];

        if (dbResponse.length === 0) {
            return new Response(
                JSON.stringify(dbResponse),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify(dbResponse),
            { status: 200 }
        );
    } catch (err) {
        return new Response(
            JSON.stringify({ message: err }),
            { status: 500 }
        );
    }
}

const createPrediction = (predictionData: any): Promise<string> => {
    const { usuario, id_partido, equipo1_goles, equipo2_goles } = predictionData;
    const QUERY = `INSERT INTO Prediccion (usuario, id_partido, equipo1_goles, equipo2_goles,puntaje) VALUES (?, ?, ?, ?,${0})`;

    return new Promise((resolve, reject) => {
        connection.query(QUERY, [usuario, id_partido, equipo1_goles, equipo2_goles], (err, results) => {
            if (err) {
                reject(err);
                return;
            }
            resolve("Prediction created successfully");
        });
    });
};

const updatePrediction = (predictionData: any): Promise<string> => {
    const { usuario, id_partido, equipo1_goles, equipo2_goles } = predictionData;
    const QUERY = `UPDATE Prediccion SET equipo1_goles = ?, equipo2_goles = ? WHERE usuario = ? AND id_partido = ?`;

    return new Promise((resolve, reject) => {
        connection.query(QUERY, [equipo1_goles, equipo2_goles, usuario, id_partido], (err, results) => {
            if (err) {
                reject(err);
                return;
            }
            resolve("Prediction updated successfully");
        });
    });
};

const getPredictionFromUser = (query: string, params: any[]): Promise<any> => {
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
