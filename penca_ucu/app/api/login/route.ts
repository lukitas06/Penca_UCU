'use server'
import {connection} from '../../lib/dbConnection'



export async function POST(req:any,res:any) {
        const body = await req.json()
        const {username, password} = body;
        try{
            const QUERY = `SELECT * FROM Usuario WHERE usuario = '${username}'`;

            const res = await getUser(QUERY) as object[];
            console.log("user from db",res);
            if(res.length === 0){
                return new Response(
                    JSON.stringify({message: 'User not found'}),
                    {status: 404}
                )
            }
            else{
                return new Response(
                    JSON.stringify({user: res[0]}),
                    {status: 200}
                )
            }
            
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