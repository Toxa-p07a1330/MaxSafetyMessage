import {Link, NativeRouter} from "react-router-native";
import {StyleSheet, Text, View} from "react-native";
import {MyRouters} from "./src/routers/MyRouters";

export default function App() {
    return <NativeRouter>
        <View style={styles.container}>
            <View style={styles.nav}>
                <Link
                    to="/read"
                    underlayColor="#f0f4f7"
                    style={styles.navItem}
                >
                    <Text>Read</Text>
                </Link>
                <Link
                    to="/write"
                    underlayColor="#f0f4f7"
                    style={styles.navItem}
                >
                    <Text>Write</Text>
                </Link>

            </View>

            <MyRouters/>
        </View>
    </NativeRouter>
}
const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        padding: 10
    },
    header: {
        fontSize: 20
    },
    nav: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    navItem: {
        flex: 1,
        alignItems: "center",
        padding: 10
    },
    subNavItem: {
        padding: 5
    },
    topic: {
        textAlign: "center",
        fontSize: 15
    }
});