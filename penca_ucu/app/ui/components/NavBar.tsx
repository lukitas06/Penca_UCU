'use client';

import React from "react";
import "../styles/NavBar.css";


export default function NavBar({ changeView }: { changeView: (view: string) => void; }) {

    const [view, setView] = React.useState("proximos");

    const handleClick = (viewToSet: string) => {

        setView(viewToSet);
        changeView(viewToSet);

    };

    return (
        <div className="col col-12 navBar-container">
            <div className="row navBar-row" >
                <div className={`col  navBar-column ${view == 'proximos' ? 'selected' : ''}`} >
                    <button onClick={() => handleClick('proximos')} >Próximos partidos</button>
                </div>
                <div className={`col  navBar-column ${view == 'jugados' ? 'selected' : ''}`}>
                    <button onClick={() => handleClick('jugados')} >Partidos jugados</button>

                </div>
                <div className={`col  navBar-column ${view == 'ranking' ? 'selected' : ''}`}>
                    <button onClick={() => handleClick('ranking')}>Ranking</button>
                </div>
            </div>
        </div>
    );
}