'use server'
import { use } from 'react';
import { connection } from '../../lib/dbConnection'
import { NextRequest } from 'next/server';

export async function GET() {
    //call the provider or db to get the teams
        
    try{
        const res = await getUsers();

        return Response.json(res); 
    }
    catch(err){
        return  new Response(
            JSON.stringify({message: 'Internal server error'}),
            {status: 500}
        );
    }
}

export async function POST(req:any,res:any) {

    const body = await req.json();
    try{
        const res = await postUser(body);
        return Response.json({message: res});
    }
    catch(err){
        return new Response(
            JSON.stringify({message: 'Error creating the user'}),
            {status: 500}
        );
    }
}

const postUser =  (userData:any): Promise<string> => {
    const {username, name, lastname, email, firstPlace, secondPlace,career, password,admin} = userData;

    const score = 0;
    const QUERY = admin === true?`INSERT INTO Usuario (usuario, nombres, apellidos, email, contrasena, es_admin) VALUES ('${username}','${name}','${lastname}','${email}','${password}',${admin});`
    :`INSERT INTO Usuario (usuario, nombres, apellidos, email, contrasena, es_admin, puntaje, carrera, primer_lugar, segundo_lugar) VALUES ('${username}','${name}','${lastname}','${email}','${password}',${admin},${score},'${career}','${firstPlace}','${secondPlace}');`
    return new Promise((resolve, reject) => {
        connection.query(QUERY, (err, results) => {
            if (err) {
                reject(err);
                return;
            } 
            console.log("results",results);
            resolve("User created successfully");
        });
    })
}

const getUsers =  () => {
    const QUERY = `SELECT * FROM Alumn`;

    return new Promise((resolve,reject) => {
        connection.query(QUERY, (err,results)=>{
            if(err){
                reject(err)
                return;
            }
            resolve(results)
        })
    }
)
}