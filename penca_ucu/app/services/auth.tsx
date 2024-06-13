'use server';
import { SignUpFormSchema, SignInFormSchema, SignInFormState, SignUpFormState } from '../lib/definitions';
import bcrypt from 'bcryptjs';
import { signToken } from './tokenService';
import { UserResponse } from '../lib/user';
import { cookies } from 'next/headers';

export async function signUp(formData: any) {
    // Validate form fields

    const validatedFields = SignUpFormSchema.safeParse({
        usuario: formData.get('username'),
        nombres: formData.get('name'),
        apellidos: formData.get('lastname'),
        email: formData.get('email'),
        contrasena: formData.get('password'),
        confirmarContrasena: formData.get('confirmPassword'),
        carrera: formData.get('career'),
        primer_lugar: formData.get('firstPlace'),
        segundo_lugar: formData.get('secondPlace')
    });

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }
    //Fields to create a user in the db
    console.log('data', validatedFields.data);
    const { usuario, nombres, apellidos, email, contrasena, carrera, primer_lugar, segundo_lugar } = await validatedFields.data;
    // crypto password
    const cryptedPassword = await bcrypt.hash(contrasena, 10);

    //insert user in the db
    const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            usuario,
            nombres,
            apellidos,
            email,
            contrasena: cryptedPassword,
            carrera,
            primer_lugar,
            segundo_lugar
        }),
    });


    // return the response
    return response.json();
}

export async function signIn(formData: any) {
    // Validate form fields
    const validatedFields = SignInFormSchema.safeParse({
        usuario: formData.get('username'),
        contrasena: formData.get('password'),
    });

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }
    // Call the provider or db to validate the user
    const { usuario, contrasena } = await validatedFields.data;
    const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            usuario,
            contrasena
        }),

    });
    if (response.status != 200) {
        return response.json();
    }

    const userResponse = await response.json();
    const user: UserResponse = userResponse.user;

    const contrasenaFromDb = user.contrasena;
    const rol = user.es_admin === 1 ? 'admin' : 'student';

    const match = await bcrypt.compare(contrasena, contrasenaFromDb);
    if (match) {
        const token = await signToken(usuario, rol);

        const expiration = new Date(Date.now() + 10 * 1000 * 60 * 60 * 24);
        cookies().set('token', token, {
            expires: expiration,
            httpOnly: true,
            path: '/'
        });
        return { message: 'User logged in successfully' };
    }
    return { message: 'Invalid credentials' };
}