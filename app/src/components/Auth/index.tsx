import { Route, Routes } from "react-router"
import Login from "./Login"

const Auth = () => {
    return (
        <Routes>
            <Route path="*" element={<Login />} />
        </Routes>
    )
}

export default Auth;