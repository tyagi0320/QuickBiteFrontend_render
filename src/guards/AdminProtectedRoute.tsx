import type { ReactNode } from "react";
import { TokenService } from "../services/TokenService"
import {Navigate} from 'react-router-dom'

interface AdminProtectedRouteProps {
    children: ReactNode;
}

const AdminProtectedRoute = ({children}: AdminProtectedRouteProps) => {
    const token=TokenService.getAccessToken();
    if(!token){
        return <Navigate to="/admin" />
    }
    const decode=TokenService.decodeToken();
    if(decode?.role=="admin"){
        return children
    }
    else{
        return <Navigate to="/admin" />
    }
}

export default AdminProtectedRoute