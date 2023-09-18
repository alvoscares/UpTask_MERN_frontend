import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
    /**
    * Pasos dol Context:
    * 2)La funcion identifica que es un Context (con el useContext), 
    * y este context va a extraer los datos de AuthContext (que se encuentra en el Provider).
    */
    return useContext(AuthContext)
}

export default useAuth;