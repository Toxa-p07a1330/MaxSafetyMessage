import {Button, Text, TouchableOpacity, View} from "react-native";
import {useNavigate} from "react-router-native";
import {useEffect, useState} from "react";
import {ROUTES} from "../../routers/MyRouters";

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
        <View>
            <Text>
                <TouchableOpacity onLongPress={navigateHandler}>
                    <Text>
                        STOPWATCH
                    </Text>
                </TouchableOpacity>
            </Text>
            <Text>
                Time
            </Text>
            <Text>
                {timeShift / 1000}
            </Text>
            <Button title={isActive ? "Stop" : "Start"} onPress={buttonHandler}/>

        </View>
    );
}
