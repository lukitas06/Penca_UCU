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
    carrera: z.string().trim(),
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

export const MatchFormSchema: any = z.object({
    equipo1: z.string().trim(),
    equipo2: z.string().trim(),
    fecha: z.string().trim(),
    etapa: z.string().trim(),
}).refine(data => data.equipo1 !== data.equipo2, {
    message: "Los equipos deben ser distintos.",
    path: ["equipo2"],
}).refine(data => equipos.includes(data.equipo1) && equipos.includes(data.equipo2), {
    message: "Los equipos deben ser válidos.",
    path: ["equipo1"],
}).refine(data => etapas.includes(data.etapa), {
    message: "La etapa debe ser válida.",
    path: ["etapa"],
});

export type MatchFormState = {
    errors?: {
        equipo1?: string[];
        equipo2?: string[];
        fecha?: string[];
        etapa?: string[];
    };
    message?: string;
} | undefined;

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
        carrera?: string[];
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

const equipos = [
    'Argentina',
    'Bolivia',
    'Brasil',
    'Chile',
    'Colombia',
    'Ecuador',
    'Paraguay',
    'Perú',
    'Canadá',
    'México',
    'Jamaica',
    'Estados Unidos',
    'Uruguay',
    'Venezuela',
    'Panamá',
    'Costa Rica',
];

const etapas = [
    'CUARTOS_DE_FINAL',
    'SEMIFINAL',
    'TERCER_PUESTO',
    'FINAL',
];
