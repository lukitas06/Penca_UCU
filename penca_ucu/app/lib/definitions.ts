import { z } from "zod";


export const SignUpFormSchema: any = z.object({
    nombres: z
        .string()
        .min(2, "El nombre debe tener al menos 2 caracteres")
        .trim(),
    apellidos: z.string().min(2, "El apellido debe tener al menos 2 caracteres").trim(),
    email: z.string().email({ message: 'Por favor ingresar un email válido.' }).trim(),
    primerLugar: z.string().trim(),
    segundoLugar: z.string().trim(),
    contrasena: z
        .string()
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .regex(/[a-zA-Z]/, { message: 'Al menos una letra.' })
        .regex(/[0-9]/, { message: 'Al menos un número.' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Al menos un cáracter especial.',
        })
        .trim(),
    confirmarContrasena: z
        .string(),
}).refine(data => data.contrasena === data.confirmarContrasena, {
    message: "Las contraseñas deben coincidir.",
    path: ["confirmarContrasena"],
}).refine(data => data.primerLugar !== data.segundoLugar, {
    message: "Los equipos deben ser distintos.",
    path: ["segundoLugar"],
});

export const SignInFormSchema: any = z.object({
    usuario: z
        .string()
        .min(2, "Provee un nombre de usuario válido")
        .trim(),
    contrasena: z
        .string()
        .min(2, "Provee una contraseña válida")
        .trim(),
});

export type SignUpFormState = {
    errors?: {
        usuario?: string[];
        nombres?: string[];
        apellidos?: string[];
        email?: string[];
        primerLugar?: string[];
        segundoLugar?: string[];
        contrasena?: string[];
        confirmarContrasena?: string[];
    };
    message?: string;
} | undefined;

export type SignInFormState = {
    errors?: {
        usuario?: string[];
        contrasena?: string[];
    };
    message?: string;
} | undefined;