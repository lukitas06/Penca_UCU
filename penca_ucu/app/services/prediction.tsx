'use server'

export async function makePrediction(formData: any, usuario: string, id_partido: string) {

    try {
        const equipo1_goles = formData.get("equipo1_goles")
        const equipo2_goles = formData.get("equipo2_goles")

        if (equipo1_goles === null || equipo2_goles === null) {
            return { message: 'Faltan parámetros' }
        }
        else {
            const url = "http://localhost:3000/api/prediction";
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
        console.log(error)
    }
}