'use server';
import { connection } from '@//lib/dbConnection';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    //call the provider or db to get the teams

    try {

        const cookies = req.cookies;
        const cookie = cookies.get('token') || "";

        //if (cookie !== "") {
        const res = await getUsers();

        return Response.json(res);
        //}
        // else {
        //     return new Response(
        //         JSON.stringify({ message: 'Unauthorized' }),
        //         { status: 401 }
        //     );
        // }


    }
    catch (err) {
        return new Response(
            JSON.stringify({ message: err }),
            { status: 500 }
        );
    }
}

export async function POST(req: any, res: any) {
    const body = await req.json();
    const { usuario, nombres, apellidos, email, contrasena, carrera, primer_lugar, segundo_lugar } = body;
    const query = `INSERT INTO Usuario (usuario, nombres, apellidos, email, contrasena, es_admin, puntaje, carrera, primer_lugar, segundo_lugar) VALUES (?, ?, ?, ?, ?, FALSE, 0, ?, ?, ?);`;
    try {
        const res = await postUser(query, [usuario, nombres, apellidos, email, contrasena, carrera, primer_lugar, segundo_lugar]);
        return Response.json({ message: res });
    } catch (err) {
        return new Response(
            JSON.stringify({ message: err }),
            { status: 500 }
        );
    }
}

const postUser = (query: any, params: any[]): Promise<string> => {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (err, results) => {
            if (err) {
                reject(err);
                return;
            }
            console.log("results", results);
            resolve("User created successfully");
        });
    });
};

const getUsers = () => {
    const QUERY = `SELECT usuario, puntaje FROM Usuario ORDER BY puntaje DESC`;
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
