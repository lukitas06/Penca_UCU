'use server'

export function validateGoals(formData: any) {

    try {
        const team1Goals = formData.get("team1-goals")
        const team2Goals = formData.get("team2-goals")

        if (team1Goals === null || team2Goals === null) {
            throw new Error("Invalid data")
        }
        else {

        }
    }
    catch (error) {

    }
}