import {Button, Pressable, Text, TouchableOpacity, View} from "react-native";
import {useNavigate} from "react-router-native";
import {useEffect, useState} from "react";
import {ROUTES} from "../../routers/MyRouters";
import {styles} from "./style";

export default function Mock() {

    const targetTime = 4000;
    const allowedShift = 250;
    const navigate = useNavigate();

    const navigateHandler = () => {
        if (Math.abs(timeShift - targetTime) > allowedShift)
            return
        const path = ROUTES.WRITE;
        navigate(path);
    }

    const [initialTime, setInitialTime] = useState(new Date().getTime())
    const [timeShift, setTimeShift] = useState(0)
    const [isActive, setActive] = useState(false)

    const buttonHandler = () => {
        if (isActive) {
            setActive(() => false)
        } else {
            setActive(() => true)
            setInitialTime(new Date().getTime())
        }
    }

    useEffect(() => {
        setTimeout(() => {
            if (isActive) {
                setTimeShift(-initialTime + new Date().getTime())
            }
        }, 1)
    }, [timeShift, isActive])
    return (
        <View style={styles.wrapper}>
            <Text>
                <TouchableOpacity onLongPress={navigateHandler}>
                    <Text style={styles.title}>
                        STOPWATCH
                    </Text>
                </TouchableOpacity>
            </Text>
            <Text style={styles.timer_title}>
                Time
            </Text>
            <Text style={styles.time}>
                {timeShift / 1000}
            </Text>
            <Pressable onPress={buttonHandler} style={styles.button} >
                <Text style={styles.button_text}>
                    {isActive ? "Stop" : "Start"}
                </Text>
            </Pressable>

        </View>
    );
}
