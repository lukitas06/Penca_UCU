
export type UserResponse = {
    usuario: string;
    nombres: string;
    apellidos: string;
    email: string;
    contrasena: string;
    es_admin: number;
    puntaje: number;
    carrera: string;
    primer_lugar: string;
    segundo_lugar: string;
};

export type RankingResponse = {
    usuario: string;
    puntaje: number;
};