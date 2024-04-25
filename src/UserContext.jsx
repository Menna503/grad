import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { getToken, removeToken } from "./utils/authentication";

import { jwtDecode } from "jwt-decode";



export const UserContext = createContext({})

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        if (!user) {
            const token = getToken()
            if (!token) return
            const decodedToken = jwtDecode(token)
            setUser(decodedToken)
        }
    }, [[user]])
   

    const logout = () => {
        removeToken();
        setUser(null);
    };
    
    return (
        <UserContext.Provider value={{ user, setUser, logout}}>
            {children}
        </UserContext.Provider>
    )
}
