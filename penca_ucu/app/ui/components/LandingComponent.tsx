'use client';

import React, { useEffect } from "react";
import NavBar from "@//ui/components/NavBar";
import MatchCard from "@//ui/components/MatchCard";
import RankingCard from "./RankingCard";
import { matchResponse } from "@//lib/match";
import { RankingResponse } from "@//lib/user";
import { predictionResponse } from "@//lib/prediction";
import { getPredictionsByUser } from "@//services/prediction";


type predictionHashMap = {
    id: string,
    prediction: predictionResponse,

};

type user = {
    username: string,
    rol: string
}

export default function LandingComponent({ matches, users, user }: { matches: matchResponse[], users: RankingResponse[], user: user; }) {

    const [view, setView] = React.useState("proximos");
    const [predictions, setPreditions] = React.useState<predictionHashMap[]>([]);
    const [predictionsIds, setPreditionsIds] = React.useState<string[]>([]);

    useEffect(() => {
        getPredictionsByUser(user.username).then((res) => {
            console.log("predicciones ", res);
            let idsWithPrediction: predictionHashMap[] = [];
            let ids: string[] = [];
            res.map((pred: predictionResponse) => {
                idsWithPrediction.push({ id: pred.id_partido, prediction: pred });
                ids.push(pred.id_partido);
            });
            console.log("id de predicciones ", ids);
            setPreditions(idsWithPrediction);
            setPreditionsIds(ids);
        });
    }, []);

    const handleViewChange = (viewParam: string) => {
        setView(viewParam);
    };

    const partidosGrupoA = matches.filter(match => match.grupo === 'A');
    const partidosGrupoB = matches.filter(match => match.grupo === 'B');
    const partidosGrupoC = matches.filter(match => match.grupo === 'C');
    const partidosGrupoD = matches.filter(match => match.grupo === 'D');

    const findPrediction = (id: string) => {
        return predictions.find(pred => pred.id === id);
    };

    if (view == "jugados") {
        return (
            <div className="col col-12 landing-container">
                <NavBar changeView={handleViewChange} />
                <div className="col col-12 matchCard-container">
                    <h5>Grupo A</h5>
                    <div className="row match-group-container">
                        {partidosGrupoA.filter(match => match.finalizado && predictionsIds.includes(match.id)).map(match =>
                            <MatchCard matchInfo={match} predicted={true} prediction={findPrediction(match.id)} rol={user.rol} />)}
                        {partidosGrupoA.filter(match => match.finalizado && !predictionsIds.includes(match.id)).map(match =>
                            <MatchCard matchInfo={match} predicted={false} prediction={undefined} rol={user.rol} />)}
                    </div>
                    <h5>Grupo B</h5>
                    <div className="row match-group-container">
                        {partidosGrupoB.filter(match => match.finalizado && predictionsIds.includes(match.id)).map(match =>
                            <MatchCard matchInfo={match} predicted={true} prediction={findPrediction(match.id)} rol={user.rol} />)}
                        {partidosGrupoB.filter(match => match.finalizado && !predictionsIds.includes(match.id)).map(match =>
                            <MatchCard matchInfo={match} predicted={false} prediction={undefined} rol={user.rol} />)}
                    </div>

                    <h5>Grupo C</h5>
                    <div className="row match-group-container">
                        {partidosGrupoC.filter(match => match.finalizado && predictionsIds.includes(match.id)).map(match =>
                            <MatchCard matchInfo={match} predicted={true} prediction={findPrediction(match.id)} rol={user.rol} />)}
                        {partidosGrupoC.filter(match => match.finalizado && !predictionsIds.includes(match.id)).map(match =>
                            <MatchCard matchInfo={match} predicted={false} prediction={undefined} rol={user.rol} />)}
                    </div>
                    <h5>Grupo D</h5>
                    <div className="row match-group-container">
                        {partidosGrupoD.filter(match => match.finalizado && predictionsIds.includes(match.id)).map(match =>
                            <MatchCard matchInfo={match} predicted={true} prediction={findPrediction(match.id)} rol={user.rol} />)}
                        {partidosGrupoD.filter(match => match.finalizado && !predictionsIds.includes(match.id)).map(match =>
                            <MatchCard matchInfo={match} predicted={false} prediction={undefined} rol={user.rol} />)}
                    </div>
                </div>
            </div>
        );
    }
    else if (view == "proximos") {
        return (
            <div className="col col-12 landing-container">
                <NavBar changeView={handleViewChange} />
                <div className="col col-12 matchCard-container">
                    <h5>Grupo A</h5>
                    <div className="row match-group-container">
                        {partidosGrupoA.filter(match => !match.finalizado && predictionsIds.includes(match.id)).map(match =>
                            <MatchCard matchInfo={match} predicted={true} prediction={findPrediction(match.id)} rol={user.rol} />)}
                        {partidosGrupoA.filter(match => !match.finalizado && !predictionsIds.includes(match.id)).map(match =>
                            <MatchCard matchInfo={match} predicted={false} prediction={undefined} rol={user.rol} />)}
                    </div>
                    <h5>Grupo B</h5>
                    <div className="row match-group-container">
                        {partidosGrupoB.filter(match => !match.finalizado && predictionsIds.includes(match.id)).map(match =>
                            <MatchCard matchInfo={match} predicted={true} prediction={findPrediction(match.id)} rol={user.rol} />)}
                        {partidosGrupoB.filter(match => !match.finalizado && !predictionsIds.includes(match.id)).map(match =>
                            <MatchCard matchInfo={match} predicted={false} prediction={undefined} rol={user.rol} />)}
                    </div>
                    <h5>Grupo C</h5>
                    <div className="row match-group-container">
                        {partidosGrupoC.filter(match => !match.finalizado && predictionsIds.includes(match.id)).map(match =>
                            <MatchCard matchInfo={match} predicted={true} prediction={findPrediction(match.id)} rol={user.rol} />)}
                        {partidosGrupoC.filter(match => !match.finalizado && !predictionsIds.includes(match.id)).map(match =>
                            <MatchCard matchInfo={match} predicted={false} prediction={undefined} rol={user.rol} />)}
                    </div>
                    <h5>Grupo D</h5>
                    <div className="row match-group-container">
                        {partidosGrupoD.filter(match => !match.finalizado && predictionsIds.includes(match.id)).map(match =>
                            <MatchCard matchInfo={match} predicted={true} prediction={findPrediction(match.id)} rol={user.rol} />)}
                        {partidosGrupoD.filter(match => !match.finalizado && !predictionsIds.includes(match.id)).map(match =>
                            <MatchCard matchInfo={match} predicted={false} prediction={undefined} rol={user.rol} />)}
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="col col-12 landing-container">
                <NavBar changeView={handleViewChange} />
                <RankingCard header={["Posicion", "Usuario", "Puntos"]} users={users} />
            </div>
        );

    }


}