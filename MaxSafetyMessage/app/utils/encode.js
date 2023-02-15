import {Buffer} from 'buffer'
import {sha256} from 'js-sha256';

const charSet = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm0123456789+/=";
const getIndexByChar = (char) => {
    return charSet.indexOf(char)
}
const getCharByIndex = (index) => {
    return charSet[index]
}
export const encode = (text, key) => {
    let encodedString = ""
    for (let i = 0; i < text.length; i++) {
        if (text[i] === "=" || text[i] === undefined) break;

        const orderedTextCharCode = getIndexByChar(text[i]);
        const orderedKeyCharCode = getIndexByChar(key[i]);

        const orderedEncryptedChar = getCharByIndex(orderedKeyCharCode ^ orderedTextCharCode)
        encodedString = encodedString + orderedEncryptedChar
    }

    return encodedString
}


export function toBase64(input) {
    return Buffer.from(input, 'utf-8').toString('base64')
}

export function fromBase64(encoded) {
    return Buffer.from(encoded, 'base64').toString('utf8')
}

export function createHash(message) {
    return sha256(message);
}