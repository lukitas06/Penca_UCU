'use server'
import { connection } from '@//lib/dbConnection'

export async function GET() {

    try {
        const matches = await getMatches()
        console.log("from api ", matches)
        return new Response(
            JSON.stringify(matches),
            { status: 200 }
        )
    }
    catch {
        return new Response(
            JSON.stringify({ message: 'Internal server error' }),
            { status: 501 }
        )
    }
}

export async function POST() {

}

const getMatches = () => {
    const QUERY = 'SELECT * FROM Partido;'

    return new Promise((resolve, reject) => {
        connection.query(QUERY, (err, results) => {
            if (err) {
                reject(err)
                return;
            }
            resolve(results)
        })
    }
    )
}