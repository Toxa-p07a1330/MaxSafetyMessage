import {Button, Text, View} from "react-native";
import {useNavigate} from "react-router-native";

export default function Mock() {

    // const navigate = useNavigate();
    //
    // const navigateHandler = () => {
    //     const path = `/write`;
    //     navigate(path);
    // }
    return (
        <View>
            <Text>
                Mock
            </Text>
            {/*<Button title={"Open"} onPress={navigateHandler}/>*/}
        </View>
    );
}
