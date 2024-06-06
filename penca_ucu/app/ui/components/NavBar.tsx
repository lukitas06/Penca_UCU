'use client'

import React from "react"
import "../styles/NavBar.css"
import { set } from "zod"

export default function NavBar() {

    const [view, setView] = React.useState("")

    const handleClick = (viewParam: string) => {

        setView(viewParam)


    }

    return (
        <div className="col col-12 navBar-container">
            <div className="row navBar-row" >
                <div className={`col  navBar-column ${view == 'proximos' ? 'selected' : ''}`} >
                    <button onClick={() => handleClick('proximos')} >Proximos partidos</button>
                </div>
                <div className={`col  navBar-column ${view == 'jugados' ? 'selected' : ''}`}>
                    <button onClick={() => handleClick('jugados')} >Partidos Jugados</button>

                </div>
                <div className={`col  navBar-column ${view == 'ranking' ? 'selected' : ''}`}>
                    <button onClick={() => handleClick('ranking')}>Ranking</button>

                </div>
            </div>
        </div>
    )
}