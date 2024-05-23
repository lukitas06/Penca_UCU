'use server'
import { connection } from '../../lib/dbConnection'

export async function GET() {
    //call the provider or db to get the teams
        
    try{
        const res = await getTeams();

        return Response.json({res}); 
    }
    catch(err){
        return  new Response(
            JSON.stringify({message: 'Internal server error'}),
            {status: 500}
        );
    }
}

export async function POST() {

    return Response.json({message: 'POST method not implemented'});
}

const getTeams =  () => {

    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM Team', (err, results) => {
            if (err) {
                reject(err);
                return;
            } 
            resolve(results);
        });
    })
}

    