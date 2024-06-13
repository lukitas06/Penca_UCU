'use server'

import { NextRequest } from "next/server";
import { connection } from '@//lib/dbConnection';

export async function GET(req: Request, { params }: { params: { idPartido: string, usuario: string } }) {

    // const { searchParams } = new URL(req.url);
    // const idPartido = searchParams.get('idPartido');
    // const usuario = searchParams.get('usuario');
    // console.log("reconocio ruta", idPartido, usuario);
    // if (!idPartido || !usuario) {
    //     return new Response(
    //         JSON.stringify({ message: 'Faltan parámetros' }),
    //         { status: 400 }
    //     );
    // }
    try {

        const { idPartido, usuario } = params;
        if (!idPartido || !usuario) {
            return new Response(
                JSON.stringify({ message: 'Faltan parametros' }),
                { status: 400 }
            )
        }
        const query = `SELECT * FROM Prediccion WHERE id_partido = ? AND usuario = ?`;
        const dbResponse = await getPrediction(query, [idPartido, usuario])

        return new Response(
            JSON.stringify(dbResponse),
            { status: 200 }
        )
    }
    catch (error) {
        console.log("error", error);
    }

}

const getPrediction = (query: string, params: any[]): Promise<any> => {
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