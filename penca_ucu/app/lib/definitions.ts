import { z } from "zod";


export const SignUpFormSchema: any = z.object({
    usuario: z.string().min(2, "El usuario debe tener al menos 2 caracteres").trim(),
    nombres: z
        .string()
        .min(2, "El nombre debe tener al menos 2 caracteres")
        .trim(),
    apellidos: z.string().min(2, "El apellido debe tener al menos 2 caracteres").trim(),
    email: z.string().email({ message: 'Por favor ingresar un email válido.' }).trim(),
    primer_lugar: z.string().trim(),
    segundo_lugar: z.string().trim(),
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
}).refine(data => data.primer_lugar !== data.segundo_lugar, {
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
        primer_lugar?: string[];
        segundo_lugar?: string[];
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