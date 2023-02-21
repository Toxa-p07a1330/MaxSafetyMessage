import Read from "../screens/read/Read";
import Write from "../screens/write/Write";
import Mock from "../screens/mock/Mock";
import {Route, Routes} from "react-router-native";


export const MyRouters = () => {
    return <Routes>
        <Route path="/read" element={<Read/>}/>
        <Route path="/write" element={<Write/>}/>
        <Route path="/" element={<Mock/>}/>
    </Routes>

}
