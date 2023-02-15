import {constants} from "../constants";

export const sendToServer = async (message) => {
    const body = {
        "message": message
    }

    try {
        const responce = await fetch(`${constants.WAY_TO_API}message`, {
            body: JSON.stringify(body),
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const json = await responce.json()
        return json
    } catch (e) {
        alert("Error: " + JSON.stringify(e))
    }
}