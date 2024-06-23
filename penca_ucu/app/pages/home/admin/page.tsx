'use server';
import React from "react";
import Header from "@//ui/components/Header";
import LandingAdmin from "@//ui/components/LandingAdmin";
import { getMatches } from "@//services/match";


export default async function Landing() {

    //const matches = await getMatches();


    return (
        <div>
            <Header rol={"admin"} />
            <LandingAdmin />
        </div>
    );
}