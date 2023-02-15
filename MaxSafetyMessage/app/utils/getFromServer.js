import {constants} from "../constants";


export const getFromServer = async (hash) => {
    try {

        const responce = await fetch(`${constants.WAY_TO_API}message/?hash=${hash}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const json = await responce.json()
        alert(JSON.stringify(json))
        return json
    } catch (e) {
        alert("Error: " + JSON.stringify(e))
    }
}