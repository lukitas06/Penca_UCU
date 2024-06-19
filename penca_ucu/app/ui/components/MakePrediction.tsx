'use client'
import { useRouter } from "next/navigation";
import { matchResponse } from "@//lib/match"
import { makePrediction } from "@//services/prediction"
import { useState } from "react";

export default function MakePrediction({ partido, user }: { partido: matchResponse, user: string }) {

    const router = useRouter();
    const id_partido = partido.id
    const [goalsEquipo1, setGoalsEquipo1] = useState(0)
    const [goalsEquipo2, setGoalsEquipo2] = useState(0)

    const predictionValidation = async () => {
        console.log("entra a la funcion makePrediction", goalsEquipo1, goalsEquipo2, user, id_partido)
        const response = await makePrediction(goalsEquipo1, goalsEquipo2, user, id_partido);
        if (response.message === 'Prediction created successfully' || response.message === 'Prediction updated successfully') {
            alert('Prediccion creada correctamente')
            router.push('/pages/home')
        }
        else {
            alert('Error al crear la prediccion')
        }
    }
    const setGoal = (action: string, equipo: string) => {

        if (action === "mas") {
            if (equipo === "equipo1") {
                setGoalsEquipo1(goalsEquipo1 + 1)
            }
            else {
                setGoalsEquipo2(goalsEquipo1 + 1)

            }
        }
        else {
            if (equipo === "equipo1") {
                if (goalsEquipo1 > 0) {
                    setGoalsEquipo1(goalsEquipo1 - 1)
                }
            }
            else {
                if (goalsEquipo2 > 0) {

                    setGoalsEquipo2(goalsEquipo2 - 1)
                }
            }
        }
        console.log("goles equipo 1", goalsEquipo1, "goles equipo 2", goalsEquipo2)
    }


    return (
        <div className="makePrediction-div">
            <form action={predictionValidation}>
                <h3>Realizar prediccion</h3>
                <div className="makePrediction-row">
                    <div className="makePrediction-column">
                        <h5>{partido.equipo1}</h5>
                        <div className="setPrediction-goals-div">
                            <button type="button" onClick={() => setGoal("mas", "equipo1")}><i className="bi bi-plus"></i></button>
                            <button type="button" onClick={() => setGoal("menos", "equipo1")}><i className="bi bi-dash"></i></button>
                        </div>
                    </div>
                    <h3>{goalsEquipo1}</h3>
                    <p>Goles</p>
                    <h3>{goalsEquipo2}</h3>
                    <div className="makePrediction-column">
                        <div className="setPrediction-goals-div">
                            <button type="button" onClick={() => setGoal("mas", "equipo2")}><i className="bi bi-plus"></i></button>
                            <button type="button" onClick={() => setGoal("menos", "equipo2")}><i className="bi bi-dash"></i></button>
                        </div>
                        <h5>{partido.equipo2}</h5>
                    </div>
                </div>

                <button className="btn btn-primary" type="submit">Confirmar</button>
            </form>
        </div>
    )


}