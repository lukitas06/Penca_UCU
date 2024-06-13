'use server';
import { connection } from '../../lib/dbConnection';
import { UserResponse } from '@//lib/user';

export async function POST(req: any, res: any) {
    try {
        const body = await req.json();
        console.log("req body post prediction", body);
        const { usuario, id_partido } = body;

        if (!usuario || !id_partido) {
            return new Response(
                JSON.stringify({ message: 'Faltan parámetros' }),
                { status: 400 }
            );
        }

        const query = `SELECT * FROM Prediccion WHERE usuario = ? AND id_partido = ?`;

        const dbResponse = await checkPrediction(query, [usuario, id_partido]) as UserResponse[];
        console.log("user from db", dbResponse);

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
            JSON.stringify({ message: 'Internal server error' }),
            { status: 500 }
        );
    }
}

export async function GET(req: any, res: any) {
    try {
        const { searchParams } = new URL(req.url);
        const usuario = searchParams.get('usuario');
        const id_partido = searchParams.get('id_partido');
        console.log("reconocio ruta", usuario, id_partido);
        if (!usuario || !id_partido) {
            return new Response(
                JSON.stringify({ message: 'Faltan parámetros' }),
                { status: 400 }
            );
        }

        const query = `SELECT * FROM Prediccion WHERE usuario = ? AND id_partido = ?`;
        const dbResponse = await checkPrediction(query, [usuario, id_partido]) as UserResponse[];

        if (dbResponse.length === 0) {
            return new Response(
                JSON.stringify({ message: 'Prediction not found' }),
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

const createPrediction = (predictionData: any): Promise<string> => {
    const { usuario, id_partido, equipo1_goles, equipo2_goles } = predictionData;
    const QUERY = `INSERT INTO Prediccion (usuario, id_partido, equipo1_goles, equipo2_goles,puntaje) VALUES (?, ?, ?, ?,${0})`;

    return new Promise((resolve, reject) => {
        connection.query(QUERY, [usuario, id_partido, equipo1_goles, equipo2_goles], (err, results) => {
            if (err) {
                console.log("error", err);
                reject(err);
                return;
            }
            console.log("results", results);
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
            console.log("results", results);
            resolve("Prediction updated successfully");
        });
    });
};

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
