

export type matchResponse = {

    id: string;
    equipo1: string;
    equipo2: string;
    equipo1_goles: number;
    equipo2_goles: number;
    etapa: string;
    fecha: string;
    finalizado: number;
    grupo: string;
}

export function parseDate(dateParam: string) {
    const date = dateParam.split('T')[0]
    const time = dateParam.split('T')[1].split('.')[0]

    return { date, time }
}