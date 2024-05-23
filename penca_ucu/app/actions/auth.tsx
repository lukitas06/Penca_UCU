'use server';
import { SignUpFormSchema, SignInFormSchema, FormState } from '../lib/definitions';

export async function signUp(formData: any) {
    // Validate form fields
    const validatedFields = SignUpFormSchema.safeParse({
        name: formData.get('name'),
        lastname: formData.get('lastname'),
        email: formData.get('email'),
        firstPlace: formData.get('firstPlace'),
        secondPlace: formData.get('secondPlace'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
    });

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        console.log("authtsx", validatedFields.error.name);

        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }
    // Call the provider or db to create a user...
}

export async function signIn(formData: any) {
    // Validate form fields
    const validatedFields = SignInFormSchema.safeParse({
        username: formData.get('username'),
        password: formData.get('password'),
    });

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }
    // Call the provider or db to create a user...
}