'use server';

import React from "react";
import Logout from "../../ui/components/Logout";

export default async function Landing() {
    return (
        <div>
            <h1>Penca UCU Landing</h1>
            <h2>¡Bienvenido!</h2>
            <p>Penca UCU es una aplicación web para que puedas armar tu penca de la copa américa 2024.</p>
            <Logout />
        </div>
    );
}