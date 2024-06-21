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

    const username = await getUserToken();
    const usersFromDb: RankingResponse[] = await getUsersOrderedByPoints();
    const matchesFromDb: matchResponse[] = await getMatches();
    return (
        <div>
            <Header />
            <LandingComponent matches={matchesFromDb} users={usersFromDb} user={username} />
        </div>
    );
}