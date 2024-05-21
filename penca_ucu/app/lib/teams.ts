import z from "zod"



export const TeamSchema:any = z.object({

    name: z.string().min(2, "El nombre del equipo debe tener al menos 2 caracteres").trim(),
    fifa_ranking: z.number().int().positive("El ranking FIFA debe ser un número positivo"),
    // group: z.string().min(1, "El grupo del equipo debe tener al menos 1 caracter").trim(),
    // flag: z.string().min(2, "La bandera del equipo debe tener al menos 2 caracteres").trim(),
    // fifa_ranking: z.number().int().positive("El ranking FIFA debe ser un número positivo"),
    // group_position: z.number().int().positive("La posición en el grupo debe ser un número positivo"),
    // points: z.number().int().positive("Los puntos deben ser un número positivo"),
    // goals_scored: z.number().int().positive("Los goles a favor deben ser un número positivo"),
    // goals_against: z.number().int().positive("Los goles en contra deben ser un número positivo"),
    // goal_difference: z.number().int().positive("La diferencia de goles debe ser un número positivo"),
    // matches_played: z.number().int().positive("Los partidos jugados deben ser un número positivo"),
    // wins: z.number().int().positive("Las victorias deben ser un número positivo"),
    // draws: z.number().int().positive("Los empates deben ser un número positivo"),
    // losses: z.number().int().positive("Las derrotas deben ser un número positivo"),
    // team_id: z.number().int().positive("El id del equipo debe ser un número positivo"),
    // tournament_id: z.number().int().positive("El id del torneo debe ser un número positivo"),
    // created_at: z.string(),
    // updated_at: z.string(),
    // deleted_at: z.string(),
})