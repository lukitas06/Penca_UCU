'use server'

export async function makePrediction(goalsEquipo1: number, goalsEquipo2: number, usuario: string, id_partido: string) {

    try {
        const equipo1_goles = goalsEquipo1
        const equipo2_goles = goalsEquipo2

        if (equipo1_goles === null || equipo2_goles === null) {
            return { message: 'Faltan parámetros' }
        }
        else {
            const url = "http://localhost:3001/api/prediction";
            const data = { equipo1_goles, equipo2_goles, usuario, id_partido }
            const response = fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            return (await response).json()
        }
    }
    catch (error) {
        return { message: error }
    }
}