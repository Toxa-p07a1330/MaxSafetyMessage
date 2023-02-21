import {NativeRouter} from "react-router-native";
import {StyleSheet, View} from "react-native";
import {MyRouters} from "./src/routers/MyRouters";

export default function App() {
    return <NativeRouter>
        <View style={styles.container}>
            <MyRouters/>
        </View>
    </NativeRouter>
}
const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        padding: 10
    }
});