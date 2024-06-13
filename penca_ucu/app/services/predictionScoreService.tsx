'use server';
import { connection } from '../lib/dbConnection';

interface Prediction {
    usuario: string;
    id_partido: string;
    equipo1_goles: number;
    equipo2_goles: number;
    puntaje: number;
}

// Actualiza los puntajes de las predicciones de un partido
export async function actualizarPuntajes(id_partido: string, equipo1_goles: number, equipo2_goles: number) {
    try {
        const predictions: Prediction[] = await getPredictions(id_partido);

        for (const prediction of predictions) {
            let puntaje = 0;

            if (prediction.equipo1_goles === equipo1_goles && prediction.equipo2_goles === equipo2_goles) {
                puntaje = 4;
            } else if (
                (equipo1_goles > equipo2_goles && prediction.equipo1_goles > prediction.equipo2_goles) ||
                (equipo1_goles < equipo2_goles && prediction.equipo1_goles < prediction.equipo2_goles) ||
                (equipo1_goles === equipo2_goles && prediction.equipo1_goles === prediction.equipo2_goles)
            ) {
                puntaje = 2;
            }

            await updatePredictionScore(prediction.usuario, id_partido, puntaje);
            await updateUserScore(prediction.usuario, puntaje);
        }
    } catch (error) {
        console.error('Error al actualizar puntajes:', error);
    }
}

// Obtiene las predicciones de un partido
const getPredictions = (id_partido: string): Promise<Prediction[]> => {
    const query = `SELECT * FROM Prediccion WHERE id_partido = ?`;

    return new Promise((resolve, reject) => {
        connection.query(query, [id_partido], (err, results) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(results as Prediction[]);
        });
    });
};

// Actualiza el puntaje de la predicción
const updatePredictionScore = (id_partido: string, usuario: string, puntaje: number): Promise<string> => {
    const query = `UPDATE Prediccion SET puntaje = ? WHERE id_partido = ? AND usuario = ?`;

    return new Promise((resolve, reject) => {
        connection.query(query, [puntaje, id_partido, usuario], (err, results) => {
            if (err) {
                reject(err);
                return;
            }
            resolve('Puntaje actualizado');
        });
    });
};

// Obtiene el puntaje actual del usuario y le suma el puntaje pasado por parámetro
const updateUserScore = (usuario: string, puntaje: number): Promise<any> => {
    const query = `UPDATE Usuario SET puntaje = puntaje + ? WHERE usuario = ?`;

    return new Promise((resolve, reject) => {
        connection.query(query, [puntaje, usuario], (err, results) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(results);
        });
    });
};