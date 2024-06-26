'use client'
import React, { useEffect, useState } from "react";
import NavBar from "@//ui/components/NavBar";
import { matchResponse } from "@//lib/match";
import MatchCard from "@//ui/components/MatchCard";
import { getMatches, createMatch } from "@//services/match";
import { MatchFormState } from "@//lib/definitions";
import InputForm from "./InputForm";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import RankingCard from "./RankingCard";
import { RankingResponse } from "@//lib/user";

enum fases {
    CUARTOS = "CUARTOS_DE_FINAL",
    SEMIS = "SEMIFINAL",
    TERCER_PUESTO = "TERCER_PUESTO",
    FINAL = "FINAL"
}

export default function LandingAdmin({ users }: { users: RankingResponse[] }) {
    console.log("users ", users);
    const router = useRouter();
    const [view, setView] = useState("proximos");

    const [matchFormState, setMatchFormState] = useState<MatchFormState>({});

    const divElementClassname = 'col-8 form-element-div';

    const searchParams = useSearchParams();
    const modal = searchParams.get("modal");
    const handleViewChange = (viewParam: string) => {
        setView(viewParam);
    };

    const [matches, setMatches] = useState<matchResponse[]>([]);

    useEffect(() => {
        getMatches().then((res) => {
            setMatches(res);
        });
    }, []);

    const makeMatch = async (formData: any) => {
        console.log("formData ", formData)
        createMatch(formData).then((res) => {
            setMatchFormState({ errors: res?.errors, message: res?.errors?.message });
            console.log("match creation response: ", res);
            if (res?.errors == undefined) {
                alert(res?.message);
                router.push('/pages/home/admin');
            }

        });

    }

    switch (view) {

        case "proximos":
            return (
                <div className="col col-12 landing-container">
                    <NavBar changeView={handleViewChange} />
                    <div className="col col-12 matchCard-container">
                        <div className="row match-group-container">
                            {matches.filter(match => !match.finalizado).map(match =>
                                <MatchCard matchInfo={match} predicted={false} prediction={undefined} rol="admin" />
                            )}
                        </div>
                    </div>
                    {modal === 'true' &&
                        <div className="create-match-modal">

                            <div className="modal-header">
                                <h5>Crear encuentro</h5>
                            </div>
                            <div className="content">
                                <form className='row ' action={makeMatch}>
                                    <InputForm classname={divElementClassname} id='floatingTeam1' type='text' name='equipo1' label='Team 1' />
                                    <div className='input-error-msg'>
                                        {matchFormState?.errors?.equipo1 && <p>{matchFormState.errors.equipo1}</p>}
                                    </div>
                                    <InputForm classname={divElementClassname} id='floatingTeam2' type='text' name='equipo2' label='Team 2' />
                                    <div className='input-error-msg'>
                                        {matchFormState?.errors?.equipo2 && <p>{matchFormState.errors.equipo2}</p>}
                                    </div>
                                    <InputForm classname={divElementClassname} id='floatingDate' type='datetime-local' name='fecha' label='Date' />
                                    <div className='input-error-msg'>
                                        {matchFormState?.errors?.fecha && <p>{matchFormState.errors.fecha}</p>}
                                    </div>
                                    <select className='form-select' name='etapa'>
                                        <option selected>Selecciona Fase</option>
                                        <option value={fases.CUARTOS}>Cuartos de final</option>
                                        <option value={fases.SEMIS}>Semifinal</option>
                                        <option value={fases.TERCER_PUESTO}>Tercer puesto</option>
                                        <option value={fases.FINAL}>Final</option>
                                    </select>
                                    <div className='input-error-msg'>
                                        {matchFormState?.errors?.etapa && <p>{matchFormState.errors.etapa}</p>}
                                    </div>
                                    <div className="modal-footer">
                                        <div>
                                            <SubmitMatchBtn />
                                        </div>
                                        <div className="cancel-btn-div">
                                            <Link href="?modal=false">
                                                <button type="button" className="btn btn-primary" >Cancelar</button>
                                            </Link>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    }
                </div>
            )
        case "jugados":
            return (
                <div className="col col-12 landing-container">
                    <NavBar changeView={handleViewChange} />
                    <div className="col col-12 matchCard-container">
                        <div className="row match-group-container">
                            {matches.filter(match => match.finalizado).map(match =>
                                <MatchCard matchInfo={match} predicted={false} prediction={undefined} rol="admin" />
                            )}
                        </div>
                    </div>
                </div>
            )
        case "ranking":
            return (
                <div className="col col-12 landing-container">
                    <NavBar changeView={handleViewChange} />
                    <RankingCard header={["Posicion", "Usuario", "Puntos"]} users={users} />
                </div>
            )
    }

}

export function SubmitMatchBtn() {

    return (
        <button className='btn btn-primary form-submit' type="submit">
            Crear encuentro
        </button>
    );
} 