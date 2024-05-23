'use client';
import React from "react";
import { useState, useEffect } from "react";
import LoginRegisterCard from "../../ui/components/LoginRegisterCard";
import { Underdog } from "next/font/google";



export default async function Login() {

    const teamsData = fetchTeams();
    const teams: any[] = await Promise.resolve(teamsData);

    return (
        <LoginRegisterCard teams={teams} />
    );

}
const fetchTeams = async () => {

    try {
        const response = await fetch('http://localhost:3000/api/teams');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }
    catch (error) {
        console.error('There has been a problem with your fetch operation:', error);

    }
};