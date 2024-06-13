'use client'
import { matchResponse } from "@//lib/match"


export default function MakePrediction({ partido }: { partido: matchResponse }) {



    const predictionValidation = (formData: any) => {
        console.log("goles equipo1", formData.get("team1-goals"))
        console.log("goles equipo2", formData.get("team2-goals"))
    }


    return (
        <div className="makePrediction-div">
            <form action={predictionValidation}>
                <h3>Realizar prediccion</h3>
                <div className="makePrediction-row">
                    <div className="makePrediction-column">
                        <h5>{partido.equipo1}</h5>
                        <input type="number" name="team1-goals" min={0} />
                    </div>
                    <h3>Goles</h3>
                    <div className="makePrediction-column">
                        <input type="number" name="team2-goals" min={0} />
                        <h5>{partido.equipo2}</h5>
                    </div>
                </div>

                <button className="btn btn-primary" type="submit">Confirmar</button>
            </form>
        </div>
    )


}