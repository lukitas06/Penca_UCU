'use server';

import { connection } from '@//lib/dbConnection';
import { RowDataPacket } from 'mysql2';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    //call the provider or db to get the teams

    try {

        const cookies = req.cookies;
        const cookie = cookies.get('token') || "";

        const res = await getUsers();

        return Response.json(res);
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

    try {
        const userExists = await checkIfUserExists(usuario);
        const emailExists = await checkIfEmailExists(email);

        if (userExists) {
            return new Response(
                JSON.stringify({ message: "User already exists" }),
                { status: 400 }
            );
        }
        if (emailExists) {
            return new Response(
                JSON.stringify({ message: "Email already exists" }),
                { status: 400 }
            );
        }

        const query = `INSERT INTO Usuario (usuario, nombres, apellidos, email, contrasena, es_admin, puntaje, carrera, primer_lugar, segundo_lugar) VALUES (?, ?, ?, ?, ?, FALSE, 0, ?, ?, ?);`;
        const res = await postUser(query, [usuario, nombres, apellidos, email, contrasena, carrera, primer_lugar, segundo_lugar]);
        return Response.json({ message: res });
    } catch (err) {
        console.log(err);
        return new Response(
            JSON.stringify({ message: err }),
            { status: 500 }
        );
    }
}

export async function PUT(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const usuario = searchParams.get('username');

        console.log("Usuario", usuario);
        const body = await req.json();
        const { puntaje } = body;

        const query = `UPDATE Usuario SET puntaje = ? WHERE usuario = ?`;
        const dbResponse = await updateUser(query, [puntaje, usuario]);
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

const updateUser = (query: string, params: any[]): Promise<any> => {

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

const postUser = (query: any, params: any[]): Promise<string> => {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (err, results) => {
            if (err) {
                reject(err);
                return;
            }
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

const checkIfUserExists = (username: string): Promise<boolean> => {
    const checkUsernameQuery = `SELECT * FROM Usuario WHERE usuario = ?`;

    return new Promise<boolean>((resolve, reject) => {
        connection.query(checkUsernameQuery, [username], (err, results: RowDataPacket[]) => {
            if (err) {
                console.log("Error checking if user exists", err);
                reject(true)
            }
            if (results.length > 0) {
                console.log("User already exists", results);
                resolve(true);
            }
            resolve(false);
        });
    })
}

const checkIfEmailExists = (email: string): Promise<boolean> => {
    const checkUsernameQuery = `SELECT * FROM Usuario WHERE email = ?`;

    return new Promise<boolean>((resolve, reject) => {
        connection.query(checkUsernameQuery, [email], (err, results: RowDataPacket[]) => {
            if (err) {
                console.log("Error checking if email exists", err);
                reject(true)
            }
            if (results.length > 0) {
                console.log("Email already exists", results);
                resolve(true);
            }
            resolve(false);
        });
    })
}