'use server'

import React from "react"
import { matchResponse } from "@//lib/match"
import { RankingResponse } from "@//lib/user";
import LandingComponent from "@//ui/components/LandingComponent";
import Header from "@//ui/components/Header";
import { cookies } from 'next/headers'
import { verifyToken } from '@//services/tokenService'

export default async function LandingPage() {

    const username = await getUser()
    const usersFromDb: RankingResponse[] = await getUsersOrderedByPoints()
    const matchesFromDb: matchResponse[] = await getMatches()
    console.log("matches", matchesFromDb)
    return (
        <div>
            <Header />
            <LandingComponent matches={matchesFromDb} users={usersFromDb} user={username} />
        </div>
    )
}


const getUsersOrderedByPoints = async () => {

    const users = await fetch("http://localhost:3000/api/users/ranking", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        credentials: 'include'
    })
    return users.json()
}

const getMatches = async () => {

    const matches = await fetch("http://localhost:3000/api/matches")
    return matches.json()
}

const getUser = async () => {
    const token = cookies().get('token')
    if (token !== undefined) {
        const tokenItself = token.value
        const payload = await verifyToken(tokenItself)
        if (payload !== false) {
            return payload.username
        }
        return ""
    }
    return ""
}