import {Button, TextInput, View} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import {readAsString} from "../../utils/readFileAsString";
import {useState} from "react";
import {constants} from "../../constants";
import {getFromServer} from "../../utils/getFromServer";
import {createHash, encode, fromBase64} from "../../utils/encode";


export default function Read() {
    const pickHandler = async () => {
        const result = await DocumentPicker.getDocumentAsync({});
        const keys = await readAsString(result.uri);
        setKeys(JSON.parse(keys))
    }


    const [inputtedText, setInputtedText] = useState("")
    const [keys, setKeys] = useState(null)
    const [wasDecrypred, setDecrypted] = useState(false)

    const decryptHandler = async () => {
        const messageHash = JSON.parse(inputtedText).hash;
        const notepadNumber = +JSON.parse(inputtedText).number
        const keyText = keys.filter((v) => {
            return v.number === notepadNumber
        })[0]?.key
        if (!keyText) {
            alert("Incorrect input")
        }
        const serverResponse = await getFromServer(messageHash)
        const message64 = serverResponse.payload.message;
        const decoded = encode(message64, keyText)
        const plainText = fromBase64(decoded)
        if (messageHash !== createHash(message64)) {
            alert("Message has been compromised!")
            return;
        }
        setInputtedText(plainText)
        setDecrypted(true)
    }

    return (
        <View>
            {!wasDecrypred && <Button
                title={keys ? "Change notepad" : "Select notepad"}
                onPress={pickHandler}
            />}
            <TextInput
                editable={!wasDecrypred}
                multiline
                numberOfLines={4}
                maxLength={constants.MAX_MESSAGE_LENGTH}
                onChangeText={text => setInputtedText(text)}
                value={inputtedText}
                style={{
                    padding: 10,
                    borderWidth: 1,
                }}
                placeholder={"Enter message hashing JSON"}
            />

            {!wasDecrypred && !!keys && <Button title={"Decrypt"} onPress={decryptHandler}/>}

        </View>
    );
}
