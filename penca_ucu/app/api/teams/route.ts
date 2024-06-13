'use server';
import { NextResponse, NextRequest } from 'next/server';
import { connection } from '../../lib/dbConnection';

export async function GET(req: NextRequest) {
    //call the provider or db to get the teams
    console.log('req cookies', req.cookies.get('user'));

    try {
        const teams = await getTeams();
        return NextResponse.json(teams);
    } catch (err) {
        return NextResponse.json(
            { message: err },
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
