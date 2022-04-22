import { useContext } from "react"
import { Outlet } from "react-router-dom";
import { AppContext } from "./ContextApi"


export function ProtectedRoutes(){
    const {userId} = useContext(AppContext);
    return userId ? <Outlet /> : window.location.replace("/")
}