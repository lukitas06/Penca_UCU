'use client'
import { useRouter } from "next/navigation";
import { matchResponse } from "@//lib/match"
import { makePrediction } from "@//services/prediction"

export default function MakePrediction({ partido, user }: { partido: matchResponse, user: string }) {

    const router = useRouter();
    const id_partido = partido.id

    const predictionValidation = async (formData: any) => {
        const response = await makePrediction(formData, user, id_partido);
        console.log(response)
        if (response.message === 'Prediction created successfully' || response.message === 'Prediction updated successfully') {
            alert('Prediccion creada correctamente')
            router.push('/pages/home')
        }
        else {
            alert('Error al crear la prediccion')
        }
    }


    return (
        <div className="makePrediction-div">
            <form action={predictionValidation}>
                <h3>Realizar prediccion</h3>
                <div className="makePrediction-row">
                    <div className="makePrediction-column">
                        <h5>{partido.equipo1}</h5>
                        <input type="number" name="equipo1_goles" min={0} />
                    </div>
                    <h3>Goles</h3>
                    <div className="makePrediction-column">
                        <input type="number" name="equipo2_goles" min={0} />
                        <h5>{partido.equipo2}</h5>
                    </div>
                </div>

                <button className="btn btn-primary" type="submit">Confirmar</button>
            </form>
        </div>
    )


}