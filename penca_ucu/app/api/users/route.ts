'use server';

import { withTransaction } from '@//lib/transactionMiddleware';
import { NextRequest, NextResponse } from 'next/server';
import { PoolConnection } from 'mysql2/promise';

export async function GET(req: NextRequest) {
    try {
        const cookies = req.cookies;
        const cookie = cookies.get('token') || "";

        return await withTransaction(async (connection: PoolConnection) => {
            const res = await getUsers(connection);
            return NextResponse.json(res);
        });
    } catch (err) {
        return NextResponse.json(
            { message: err instanceof Error ? err.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { usuario, nombres, apellidos, email, contrasena, carrera, primer_lugar, segundo_lugar } = body;
        const query = `INSERT INTO Usuario (usuario, nombres, apellidos, email, contrasena, es_admin, puntaje, carrera, primer_lugar, segundo_lugar) VALUES (?, ?, ?, ?, ?, FALSE, 0, ?, ?, ?);`;

        return await withTransaction(async (connection: PoolConnection) => {
            const res = await postUser(connection, query, [usuario, nombres, apellidos, email, contrasena, carrera, primer_lugar, segundo_lugar]);
            return NextResponse.json({ message: res });
        });
    } catch (err) {
        console.log(err);
        return NextResponse.json(
            { message: err instanceof Error ? err.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

export async function PUT(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const usuario = searchParams.get('username');

        console.log("Usuario", usuario);
        const body = await req.json();
        const { puntaje } = body;

        const query = `UPDATE Usuario SET puntaje = ? WHERE usuario = ?`;

        return await withTransaction(async (connection: PoolConnection) => {
            const dbResponse = await updateUser(connection, query, [puntaje, usuario]);
            return NextResponse.json(dbResponse, { status: 200 });
        });
    } catch (err) {
        return NextResponse.json(
            { message: err instanceof Error ? err.message : 'Unknown error' },
            { status: 501 }
        );
    }
}

const updateUser = async (connection: PoolConnection, query: string, params: any[]): Promise<any> => {
    const [result] = await connection.execute(query, params);
    return result;
};

const postUser = async (connection: PoolConnection, query: string, params: any[]): Promise<string> => {
    const [results] = await connection.execute(query, params);
    return "User created successfully";
};

const getUsers = async (connection: PoolConnection): Promise<any> => {
    const QUERY = `SELECT usuario, puntaje FROM Usuario ORDER BY puntaje DESC`;
    const [results] = await connection.execute(QUERY);
    return results;
};
