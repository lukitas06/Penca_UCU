'use server'
import jwt from 'jsonwebtoken'
import { jwtVerify, SignJWT } from 'jose'


//const jwtSecret = process.env.JWT_SECRET || "";
const secretKey = new TextEncoder().encode('your-secret-key');


export async function signToken(username: string, rol: string) {
    const token = await new SignJWT({ username, rol })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('123h')
        .sign(secretKey);

    return token;

}
type Payload = {
    rol: string,
    username: string
}
export async function verifyToken(token: any) {

    try {
        const { payload } = await jwtVerify<Payload>(token, secretKey, {
            algorithms: ['HS256']
        })
        return payload
    }
    catch (err) {
        console.log(err)
        return false
    }

}