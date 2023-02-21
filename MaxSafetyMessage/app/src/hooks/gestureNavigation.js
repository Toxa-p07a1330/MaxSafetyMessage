import {constants} from "../../constants";
import {ROUTES} from "../routers/MyRouters";
import {useNavigate} from "react-router-native";

export const useGestureNavigation = (touchX, touchY, setTouchX, setTouchY, xDest)=>{

    const navigate = useNavigate();
    const gestureEnd = (e) => {
        console.log(e.nativeEvent)
        const xDiff = e.nativeEvent.locationX - touchX
        const yDiff = e.nativeEvent.locationY - touchY

        if (Math.abs(yDiff) > constants.Y_SENSITIVITY) {
            navigate(ROUTES.MOCK)
            return
        }

        if (Math.abs(xDiff) > constants.Y_SENSITIVITY) {
            navigate(xDest)
        }

    }
    const gestureStart = (e) => {
        setTouchX(e.nativeEvent.locationX);
        setTouchY(e.nativeEvent.locationY)
    }
    return [gestureStart, gestureEnd]
}
