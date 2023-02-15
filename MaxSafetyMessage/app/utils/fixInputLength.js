import {constants} from "../constants";

export const fixInputLength = (string)=>{
    while (string.length < constants.MAX_MESSAGE_LENGTH){
        string = string + "."
    }
    return string
}
