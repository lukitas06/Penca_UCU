'use server';
import React from "react";
import Header from "@//ui/components/Header";
import LandingAdmin from "@//ui/components/LandingAdmin";
import { getMatches } from "@//services/match";
import { getUsersOrderedByPoints } from "@//services/user";
import { RankingResponse } from "@//lib/user";


export default async function Landing() {

    //const matches = await getMatches();
    const usersFromDb: RankingResponse[] = await getUsersOrderedByPoints();

    return (
        <div>
            <Header rol={"admin"} />
            <LandingAdmin users={usersFromDb} />
        </div>
    );
}