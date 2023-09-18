import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  /**
   * Pasos dol Context:
   * 1)Desde el componente Login importo y llamo a la funcion useAuth()
   */
  const { setAuth } = useAuth();

  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault();

    if ([email, password].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    try {
      const { data } = await clienteAxios.post('/usuarios/login', {email, password})
      setAlerta({})
      // Guardo el token del usuario logueado en el LocalStorage
      localStorage.setItem('token', data.token);
      setAuth(data);
      navigate('/proyectos')
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Inicia sesión y administra tus {''}
        <span className="text-slate-700">proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta} />}

      <form 
        className="my-10 bg-white shadow rounded-lg px-10 py-10"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label 
            className="uppercase text-gray-600 block font-bold text-xl"
            htmlFor="email"
          >Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="border w-full rounded-xl bg-gray-50 p-3 mt-3"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="my-5">
          <label 
            className="uppercase text-gray-600 block font-bold text-xl"
            htmlFor="password"
          >Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="border w-full rounded-xl bg-gray-50 p-3 mt-3"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-sky-700 w-full rounded text-white py-3 mb-5 uppercase font-bold hover:cursor-pointer hover:bg-sky-800 "
        />

      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/registrar"
        >¿No tienes una cuenta? Regístrate</Link>

        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/olvide-password"
        >Olvide mi Password</Link>
      </nav>

    </>
  )
}
export default Login