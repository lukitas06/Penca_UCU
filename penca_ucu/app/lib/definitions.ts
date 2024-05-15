import {z} from "zod"


export const SignUpFormSchema:any = z.object({
    name: z
        .string()
        .min(2, "El nombre debe tener al menos 2 caracteres")
        .trim(),
    lastname: z.string().min(2, "El apellido debe tener al menos 2 caracteres").trim(),
    email: z.string().email({message: 'Por favor ingresar un email valido.'}).trim(),
    firstPlace: z.string().trim(),
    secondPlace: z.string().trim(),
    password: z
        .string()
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .regex(/[a-zA-Z]/, { message: 'Al menos una letra.' })
        .regex(/[0-9]/, { message: 'Al menos un numero.' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Al menos un caracter especial.',
        })
        .trim(),
    confirmPassword: z
        .string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords must match!",
  path: ["confirmPassword"],
}).refine(data => data.firstPlace !== data.secondPlace, {
  message: "Teams must be different!",
  path: ["secondPlace"],
})

export const SignInFormSchema:any = z.object({
    username: z
    .string()
    .min(2, "Provee un nombre de usuario válido")
    .trim(),
    password: z
    .string()
    .min(2, "Provee una contraseña válida")
    .trim(),
})

export type FormState =
  | {
      errors?: {
        name?: string[]
        lastname?: string[]
        email?: string[]
        password?: string[]
        confirmPassword?: string[]

      }
      message?: string
    }
  | undefined