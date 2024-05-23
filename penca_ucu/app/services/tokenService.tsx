'use server'
import jwt from 'jsonwebtoken'


export async function signToken(username:any, role:any) {
    const token = jwt.sign({username, role}, 'secret', {expiresIn: '1h'});
    console.log(token);
    return token;
}