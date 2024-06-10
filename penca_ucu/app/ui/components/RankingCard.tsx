'use client'
import { RankingResponse } from "@//lib/user"

export default function RankingCard({ header, users }: { header: string[], users: RankingResponse[] }) {

    console.log("users", users)
    return (
        <div className="card text-center">
            <div className="card-header">
                {header.map((headerItem) => {
                    return <p>{headerItem}</p>
                })}
            </div>
            <div className="card-body">
                {users.map((user) => {
                    return (
                        <div className="ranking-row">
                            <p>{users.indexOf(user) + 1}</p>
                            <p>{user.usuario}</p>
                            <p>{user.puntaje}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}