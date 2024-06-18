'use server'
import { connection } from '@//lib/dbConnection'
import { NextApiRequest } from 'next'

export async function GET(req: NextApiRequest,
    { params }: { params: { id: string } }) {

    try {
        const id = params.id
        if (id !== undefined) {
            const match = await getMatch(id)
            return new Response(
                JSON.stringify(match),
                { status: 200 }
            )
        }
    }
    catch (err) {
        return new Response(
            JSON.stringify({ message: err }),
            { status: 501 }
        )
    }
}


export async function UPDATE() {
    return new Response(
        JSON.stringify({ message: 'Not implemented' }),
        { status: 501 }
    )
}

const getMatch = (id: string) => {
    const QUERY = `SELECT * FROM Partido WHERE id = ${id};`

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