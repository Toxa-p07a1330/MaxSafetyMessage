import Read from "../screens/read/Read";
import Write from "../screens/write/Write";
import Mock from "../screens/mock/Mock";
import {Route, Routes} from "react-router-native";

export const ROUTES = {
    READ: "/read",
    WRITE: "/write",
    MOCK: "/"
}

export const MyRouters = () => {
    return <Routes>
        <Route path={ROUTES.READ} element={<Read/>}/>
        <Route path={ROUTES.WRITE} element={<Write/>}/>
        <Route path={ROUTES.MOCK} element={<Mock/>}/>
    </Routes>

}
