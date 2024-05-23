'use server'
import {connection} from '../../lib/dbConnection'



export async function POST(req:any,res:any) {
        const body = await req.json()
        const {username, password} = body;
        try{
            const ALUMMQUERY = `SELECT * FROM Alumn WHERE username = '${username}'`;
            const ADMINQUERY = `SELECT * FROM Admin WHERE username = '${username}'`;

            const alumnRes = await getUser(ALUMMQUERY) as object[];

            if(alumnRes.length === 0){
                const adminRes = await getUser(ADMINQUERY) as object[];
                if(adminRes.length === 0){
                    return new Response(
                        JSON.stringify({message: 'User not found'}),
                        {status: 404}
                    )
                }
                return new Response(
                    JSON.stringify({role: 'admin', user: {adminRes}}),
                    {status: 200}
                
                ) 
            }
            return new Response(
                JSON.stringify({role: 'alumn', user: {alumnRes}}),
                {status: 200}
            )
        }
        catch{
            return  new Response(
                JSON.stringify({message: 'Internal server error'}),
                {status: 500}
            )
        }
}


const getUser =  (query:string) => {
    return new Promise((resolve,reject) => {
        connection.query(query, (err,results)=>{
            if(err){
                reject(err)
                return;
            }
            resolve(results);
        });
    })
}