'use client'
import React from "react"
import { matchResponse, parseDate } from "@//lib/match"
import { predictionResponse } from "@//lib/prediction"
import { useRouter } from "next/router"
import Modal from "./Modal"
import { updateMatch } from "@//services/match"

type predictionHashMap = {
    id: string,
    prediction: predictionResponse,

}

export const PredictedAndNotFinalized = ({ matchInfo, prediction }: { matchInfo: matchResponse, prediction: predictionHashMap | undefined }) => {
    const { id, equipo1, equipo2, etapa, fecha } = matchInfo

    const parsedFecha = parseDate(fecha)

    const imgUrlEquipo1 = `/countries/${equipo1}-flag.gif`
    const imgUrlEquipo2 = `/countries/${equipo2}-flag.gif`

    return (
        <div className="col-8 col-md-3 card text-center">

            <div className="card-header">
                Mi predicción
                <EditPredictBtn matchId={id} />
                {/* <ChargeResultBtn matchId={id} goles_equipo1={6} goles_equipo2={0} /> */}
            </div>
            <div className="card-body">
                <div className="teamInfo">
                    <img className="flag-img" src={imgUrlEquipo1} alt="" />

                    <p>{equipo1}</p>
                </div>
                <div className="goals-card-column">
                    <h3>{prediction?.prediction.equipo1_goles}</h3>
                    <h3>-</h3>
                    <h3>{prediction?.prediction.equipo2_goles}</h3>
                </div>
                <div className="teamInfo">
                    <img className="flag-img" src={imgUrlEquipo2} alt="" />

                    <p>{equipo2}</p>
                </div>
            </div>
            <div className="card-footer">
                <div>{parsedFecha.date}</div>
                <div>{etapa}</div>

            </div>
        </div>
    )
}

export const PredictedAndFinalized = ({ matchInfo, prediction }: { matchInfo: matchResponse, prediction: predictionHashMap | undefined }) => {

    const { id, equipo1, equipo2, equipo1_goles, equipo2_goles, etapa } = matchInfo

    return (
        <div className="col-8 col-md-3 card text-center match-card">
            <div className="card-header">Partido finalizado

            </div>
            <div className="card-body card-body-div">
                <div className="card-body-row">

                    <div className="teamInfo">
                        <p>{equipo1}</p>
                    </div>
                    <div className="goles-div">
                        <h2>{equipo1_goles} - {equipo2_goles}</h2>
                    </div>
                    <div className="teamInfo">
                        <p>{equipo2}</p>
                    </div>
                </div>
                <p>Mi prediccion:</p>
                <div className="card-body-row">
                    <div className="teamInfo">
                        <p>{equipo1}</p>
                    </div>
                    <div className="goles-div">
                        <h2>{prediction?.prediction.equipo1_goles} - {prediction?.prediction.equipo2_goles}</h2>
                    </div>
                    <div className="teamInfo">
                        <p>{equipo2}</p>
                    </div>
                </div>
            </div>
            <div className="card-footer ">
                {etapa}
            </div>
        </div>
    )
}

export const NotPredictedAndFinalized = ({ matchInfo }: { matchInfo: matchResponse }) => {

    const { id, equipo1, equipo2, equipo1_goles, equipo2_goles, etapa, fecha } = matchInfo

    return (
        <div className="col-8 col-md-3 card text-center match-card">
            <div className="card-header">Resultado final

            </div>
            <div className="card-body">
                <div className="teamInfo">
                    <p>{equipo1}</p>
                </div>
                <div className="goles-div">
                    <h2>{equipo1_goles} - {equipo2_goles}</h2>
                </div>
                <div className="teamInfo">
                    <p>{equipo2}</p>
                </div>
            </div>
            <div className="card-footer ">
                {etapa}
            </div>
        </div>
    )
}

export const NotPredictedAndNotFinalized = ({ matchInfo }: { matchInfo: matchResponse }) => {

    const { id, equipo1, equipo2, equipo1_goles, equipo2_goles, etapa, fecha, finalizado } = matchInfo

    const parsedFecha = parseDate(fecha)

    const imgUrlEquipo1 = `/countries/${equipo1}-flag.gif`
    const imgUrlEquipo2 = `/countries/${equipo2}-flag.gif`

    return (
        <div className="col-8 col-md-3 card card-container text-center">

            <div className="card-header">
                <div>{parsedFecha.date}</div>
                <div>{parsedFecha.time}</div>

            </div>
            <div className="card-body">
                <div className="teamInfo">
                    <img className="flag-img" src={imgUrlEquipo1} alt="" />
                    <p>{equipo1}</p>
                </div>
                <PredictButton matchId={id} />
                <div className="teamInfo">
                    <img className="flag-img" src={imgUrlEquipo2} alt="" />
                    <p>{equipo2}</p>
                </div>
            </div>
            <div className="card-footer">
                {etapa}
            </div>
        </div>
    )
}

export const AdminAndNotFinalized = ({ matchInfo }: { matchInfo: matchResponse }) => {

    const { id, equipo1, equipo2, etapa, fecha } = matchInfo

    const parsedFecha = parseDate(fecha)

    const imgUrlEquipo1 = `/countries/${equipo1}-flag.gif`
    const imgUrlEquipo2 = `/countries/${equipo2}-flag.gif`

    return (
        <div className="col-8 col-md-3 card card-container text-center">

            <div className="card-header">
                <div>{parsedFecha.date}</div>
                <div>{parsedFecha.time}</div>

            </div>
            <div className="card-body">
                <div className="teamInfo">
                    <img className="flag-img" src={imgUrlEquipo1} alt="" />
                    <p>{equipo1}</p>
                </div>
                <ModalBtn match={matchInfo} />
                <div className="teamInfo">
                    <img className="flag-img" src={imgUrlEquipo2} alt="" />
                    <p>{equipo2}</p>
                </div>
            </div>
            <div className="card-footer">
                {etapa}
            </div>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Understood</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export const AdminAndFinalized = ({ matchInfo }: { matchInfo: matchResponse }) => {

    const { id, equipo1, equipo2, equipo1_goles, equipo2_goles, fecha, etapa } = matchInfo

    const parsedFecha = parseDate(fecha)

    const imgUrlEquipo1 = `/countries/${equipo1}-flag.gif`
    const imgUrlEquipo2 = `/countries/${equipo2}-flag.gif`

    return (
        <div className="col-8 col-md-3 card text-center match-card">
            <div className="card-header">Partido finalizado

            </div>
            <div className="card-body card-body-div">
                <div className="card-body-row">

                    <div className="teamInfo">
                        <img className="flag-img" src={imgUrlEquipo1} alt="" />

                        <p>{equipo1}</p>
                    </div>
                    <div className="goles-div">
                        <h2>{equipo1_goles} - {equipo2_goles}</h2>
                    </div>
                    <div className="teamInfo">
                        <img className="flag-img" src={imgUrlEquipo1} alt="" />

                        <p>{equipo2}</p>
                    </div>
                </div>
            </div>
            <div className="card-footer ">
                <div>

                    {etapa}
                </div>
                {parsedFecha.date}
            </div>
        </div>
    )
}


export function PredictButton({ matchId }: { matchId: string }) {
    const router = useRouter()

    const goPredict = (matchId: string) => {
        router.push(`/pages/home/student/prediction/${matchId}`)
    }

    return (
        <button className="btn btn-primary predict-btn" onClick={() => goPredict(matchId)} >Predecir</button>

    )
}

export function EditPredictBtn({ matchId }: { matchId: string }) {

    const router = useRouter()

    const goPredict = (matchId: string) => {
        router.push(`/pages/home/student/prediction/${matchId}`)
    }
    return (
        <button className="btn btn-primary predict-btn" onClick={() => goPredict(matchId)} >Editar</button>
    )
}

export function ModalBtn({ match }: { match: matchResponse }) {

    const [isOpen, setIsOpen] = React.useState(false)

    const [goles_equipo1, setGolesEquipo1] = React.useState(0)
    const [goles_equipo2, setGolesEquipo2] = React.useState(0)

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const setGoalsEquipo1 = (action: string) => {
        switch (action) {
            case "mas":
                setGolesEquipo1(goles_equipo1 + 1)
                break
            case "menos":
                if (goles_equipo1 > 0) {
                    setGolesEquipo1(goles_equipo1 - 1)
                }
                break

        }
    }
    const setGoalsEquipo2 = (action: string) => {

        switch (action) {
            case "mas":
                setGolesEquipo2(goles_equipo2 + 1)
                break
            case "menos":
                if (goles_equipo2 > 0) {
                    setGolesEquipo2(goles_equipo2 - 1)
                }
                break
        }
    }

    const goChargeResult = async (matchId: string) => {

        console.log("cargando resultado matchcard", matchId, goles_equipo1, goles_equipo2);
        //const response = await updateMatch(matchId, goles_equipo1, goles_equipo2);
        //alert("Resultado cargado con exito");
        console.log("Todavia no implementado");
    }
    return (
        <div>

            <button className="btn btn-primary" onClick={openModal} >Cargar</button>
            <Modal isOpen={isOpen} onClose={closeModal} matchId={match.id}>
                <h5>Cargar resultado</h5>
                <div className="modal-row-team">
                    <label>{match.equipo1}</label>
                    <p>{goles_equipo1}</p>
                    <button className="btn btn-primary mas" type="button" onClick={() => setGoalsEquipo1("mas")}><i className="bi bi-plus"></i></button>
                    <button className="btn btn-primary menos" type="button" onClick={() => setGoalsEquipo1("menos")}><i className="bi bi-dash"></i></button>
                </div>
                <div className="modal-row-team">
                    <label>{match.equipo2}</label>
                    <p>{goles_equipo2}</p>

                    <button className="btn btn-primary mas" type="button" onClick={() => setGoalsEquipo2("mas")}><i className="bi bi-plus"></i></button>
                    <button className="btn btn-primary menos" type="button" onClick={() => setGoalsEquipo2("menos")}><i className="bi bi-dash"></i></button>
                </div>
                <div className="card-footer">
                    <button className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                    <button className="btn btn-primary" onClick={() => goChargeResult(match.id)}>Confirm</button>

                </div>
            </Modal>
        </div>
    );
}
