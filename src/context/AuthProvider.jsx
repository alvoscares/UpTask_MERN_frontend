/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();

// El AuthPrivider rodea toda la aplicacion para poder compartir los datos
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // Con este useEffect cada vez que se ejecuta la aplicacion busco en el localStorage si hay un token(este token es del usuario que se logueo recientemente), y lo logueo de una.
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setCargando(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clienteAxios("/usuarios/perfil", config);
        setAuth(data);
        const lastPath = localStorage.getItem("lastPath") || "/proyectos";
        navigate(lastPath);
      } catch (error) {
        setAuth({});
      }

      setCargando(false);
    };

    autenticarUsuario();
  }, []);

  const cerrarSesionAuth = () => {
    setAuth({})
  }

  // La info en el return es la que va a estar disponible en los demas componentes
  return (
    <AuthContext.Provider
      /**
       * Pasos dol Context:
       * 3) Dentro del prop value (que es obligatorio) se deben poner los daros que se quieran compartir en el context.
       */
      value={{
        auth,
        setAuth,
        cargando,
        cerrarSesionAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
