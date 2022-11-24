import { useContext } from "react"
import { Outlet } from "react-router-dom";
import { AppContext } from "../ContextApi"


export function ProtectedRoutes(){
    const {signedUser} = useContext(AppContext);
    return signedUser ? <Outlet /> : window.location.replace("/")
}