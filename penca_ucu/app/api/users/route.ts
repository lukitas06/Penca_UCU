'use server';
import { connection } from '../../lib/dbConnection';

export async function GET(req: NextRequest, res: any) {
    //call the provider or db to get the teams

    try {
        const cookies = req.cookies;
        console.log("cookies", cookies);
        const cookie = cookies.get('rol') || "";

        if (cookie !== "") {
            console.log("cookie", cookie);
        }


        const res = await getUsers();

        return Response.json(res);
    }
    catch (err) {
        return new Response(
            JSON.stringify({ message: 'Internal server error' }),
            { status: 500 }
        );
    }
}

export async function POST(req: any, res: any) {

    const body = await req.json();
    try {
        const res = await postUser(body);
        return Response.json({ message: res });
    }
    catch (err) {
        return new Response(
            JSON.stringify({ message: err }),
            { status: 500 }
        );
    }
}

const postUser = (userData: any): Promise<string> => {

    const { usuario, nombres, apellidos, email, primerLugar, segundoLugar, carrera, contrasena, admin } = userData;

    const score = 0;
    const QUERY = admin === true ? `INSERT INTO Usuario (usuario, nombres, apellidos, email, contrasena, es_admin) VALUES ('${usuario}','${nombres}','${apellidos}','${email}','${contrasena}',${admin});`
        : `INSERT INTO Usuario (usuario, nombres, apellidos, email, contrasena, es_admin, puntaje, carrera, primer_lugar, segundo_lugar) VALUES ('${usuario}','${nombres}','${apellidos}','${email}','${contrasena}',${admin},${score},'${carrera}','${primerLugar}','${segundoLugar}');`

    return new Promise((resolve, reject) => {
        connection.query(QUERY, (err, results) => {
            if (err) {
                reject(err);
                return;
            }
            console.log("results", results);
            resolve("User created successfully");
        });
    });
};

const getUsers = () => {
    const QUERY = `SELECT * FROM Usuario`;

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
