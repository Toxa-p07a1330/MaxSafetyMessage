import {Button, Clipboard, TextInput, View} from "react-native";
import * as DocumentPicker from 'expo-document-picker';
import {useState} from "react";
import NumericInput from 'react-native-numeric-input'
import {readAsString} from "../../../utils/readFileAsString";
import {constants} from "../../../constants";
import {encode, toBase64} from "../../../utils/encode";
import {sendToServer} from "../../../utils/sendToServer";
import {ROUTES} from "../../routers/MyRouters";
import {useGestureNavigation} from "../../hooks/gestureNavigation";
import {styles} from "./styles";


export default function Write() {
    const pickHandler = async () => {
        const result = await DocumentPicker.getDocumentAsync({});
        const keys = await readAsString(result.uri);
        setKeys(JSON.parse(keys))
    }


    const [templateNumber, setTemplateNumber] = useState(0);
    const [inputtedText, setInputtedText] = useState("")
    const [keys, setKeys] = useState(null)
    const [wasEncrypted, setEncrypted] = useState(false)

    const [touchX, setTouchX] = useState(0)
    const [touchY, setTouchY] = useState(0)

    const encryptHandler = async () => {
        const keyText = keys.filter((v) => {
            return v.number === templateNumber
        })[0]?.key;

        if (!keyText) {
            alert("Key is absent")
            return
        }
        const inputtedText64 = toBase64(inputtedText)
        const encoded = encode(inputtedText64, keyText)
        const writeResult = await sendToServer(encoded)
        writeResult.payload.number = templateNumber;
        setInputtedText(JSON.stringify(writeResult.payload))
        setEncrypted(true)
    }

    const copyHandler = () => {
        Clipboard.setString(inputtedText);
        alert('Copied to clipboard')
    }

    const [gestureStart, gestureEnd] = useGestureNavigation(touchX, touchY, setTouchX, setTouchY, ROUTES.READ)

    return (
        <View onTouchEnd={gestureEnd} onTouchStart={gestureStart} style={styles.wrapper}>
            {!wasEncrypted && <>
                <Button
                    title={keys ? "Change notepad" : "Select notepad"}
                    onPress={pickHandler}
                />
                <NumericInput onChange={value => setTemplateNumber(value)}/></>}
            <TextInput
                editable
                multiline
                numberOfLines={4}
                maxLength={constants.MAX_MESSAGE_LENGTH}
                onChangeText={text => setInputtedText(text)}
                value={inputtedText}
                style={styles.text_input}
                placeholder={"Enter message"}
            />

            {!!keys && !wasEncrypted && <Button title={"Encrypt"} onPress={encryptHandler}/>}
            {!!keys && wasEncrypted && <Button title={"Copy"} onPress={copyHandler}/>}

        </View>
    );
}
