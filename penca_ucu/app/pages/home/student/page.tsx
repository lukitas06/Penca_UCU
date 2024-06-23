'use server';

import React from "react";
import { matchResponse } from "@//lib/match";
import { RankingResponse } from "@//lib/user";
import LandingComponent from "@//ui/components/LandingComponent";
import Header from "@//ui/components/Header";
import { getUserToken } from '@//services/tokenService';
import { getMatches } from "@//services/match";
import { getUsersOrderedByPoints } from "@//services/user";

export default async function LandingPage() {

    const user = await getUserToken();
    const usersFromDb: RankingResponse[] = await getUsersOrderedByPoints();
    const matchesFromDb: matchResponse[] = await getMatches();
    matchesFromDb.map(match => { console.log(match.equipo1, match.equipo2, "finalizado", match.finalizado) });
    return (
        <div>
            <Header rol={"student"} />
            <LandingComponent matches={matchesFromDb} users={usersFromDb} user={user} />
        </div>
    );
}