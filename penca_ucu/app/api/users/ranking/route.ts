
'use server'
import { connection } from '@//lib/dbConnection';

export async function GET() {

    try {
        const dbResponse = await getOrderedUsers()
        return new Response(
            JSON.stringify(dbResponse),
            { status: 200 }
        )
    }
    catch {
        return new Response(
            JSON.stringify({ message: 'Internal server error' }),
            { status: 500 }
        );
    }

}

const getOrderedUsers = async () => {
    const QUERY = `SELECT usuario,puntaje FROM Usuario ORDER BY puntaje DESC;`;

    return new Promise((resolve, reject) => {
        connection.query(QUERY, (err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        });
    });
}