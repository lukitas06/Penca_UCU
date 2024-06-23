'use client'
import React, { useEffect } from "react";
import NavBar from "@//ui/components/NavBar";
import { matchResponse } from "@//lib/match";
import MatchCard from "@//ui/components/MatchCard";
import { getMatches } from "@//services/match";
import { useSearchParams, usePathname } from 'next/navigation';
import InputForm from "./InputForm";
import Link from "next/link";

enum fases {
    CUARTOS = "CUARTOS_DE_FINAL",
    SEMIS = "SEMIFINAL",
    TERCER_PUESTO = "TERCER_PUESTO",
    FINAL = "FINAL"
}

export default function LandingAdmin() {

    const [view, setView] = React.useState("proximos");
    const [matches, setMatches] = React.useState<matchResponse[]>([]);
    const divElementClassname = 'col-8 form-element-div';

    const searchParams = useSearchParams();
    const modal = searchParams.get("modal");
    console.log("modal ", modal);
    const pathname = usePathname();

    const handleViewChange = (viewParam: string) => {
        setView(viewParam);
    };

    useEffect(() => {
        getMatches().then((res) => {
            console.log("matches ", res);
            setMatches(res);
        });
    }, []);

    const makeMatch = async () => {

        console.log("making match...");
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
                                    <InputForm classname={divElementClassname} id='floatingTeam2' type='text' name='equipo2' label='Team 2' />
                                    <InputForm classname={divElementClassname} id='floatingDate' type='date' name='fecha' label='Date' />
                                    <select className='form-select' name='fase'>
                                        <option selected>Selecciona Fase</option>
                                        <option value={fases.CUARTOS}>Cuartos de final</option>
                                        <option value={fases.SEMIS}>Semifinal</option>
                                        <option value={fases.TERCER_PUESTO}>Tercer puesto</option>
                                        <option value={fases.FINAL}>Final</option>
                                    </select>

                                </form>
                            </div>
                            <div className="modal-footer">

                                <button type="submit" className="btn btn-primary" >Crear encuentro</button>
                                <Link href="?modal=false">
                                    <button type="button" className="btn btn-primary" >Cancelar</button>
                                </Link>
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
    }

}