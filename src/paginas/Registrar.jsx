import { Link } from "react-router-dom"
import { useState } from "react"
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alerta";

const Registrar = () => {

  const [ nombre, setNombre ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ repetirPassword, setRepetirPassword ] = useState('');
  const [ alerta, setAlerta ] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    /* Si algun campo viene vacio ('') seteo el objeto alerta y mando a este objeto como props en el componente <Alerta />*/ 
    if ([nombre, email, password, repetirPassword].includes('')) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true
      })
      return
    }

    if (password !== repetirPassword) {
      setAlerta({
        msg: "Los password no son iguales",
        error: true
      })
      return
    }

    if (password.length < 6) {
      setAlerta({
        msg: "El password es muy conrto, agrega minimo 6 caratecteres",
        error: true
      })
      return
    }

    setAlerta({});

    // Crear el usuario en la API
    try {
      const { data } = await clienteAxios.post(`/usuarios`, {nombre, email, password})

      setAlerta({
        msg: data.msg,
        error: false
      })

      setNombre('');
      setEmail('');
      setPassword('');
      setRepetirPassword('');

    } catch (error) {
      // Este error viene de la API
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  // Si la variable msg tiene datos significa que hay una alerta
  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Crea tu cuenta y administra tus {''}
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
            htmlFor="nombre"
          >Nombre</label>
          <input
            id="nombre"
            type="text"
            placeholder="Tu Nombre"
            className="border w-full rounded-xl bg-gray-50 p-3 mt-3"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>

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

        <div className="my-5">
          <label 
            className="uppercase text-gray-600 block font-bold text-xl"
            htmlFor="password2"
          >Repetir Password</label>
          <input
            id="password2"
            type="password"
            placeholder="Repetir tu Password"
            className="border w-full rounded-xl bg-gray-50 p-3 mt-3"
            value={repetirPassword}
            onChange={e => setRepetirPassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Crear Cuenta"
          className="bg-sky-700 w-full rounded text-white py-3 mb-5 uppercase font-bold hover:cursor-pointer hover:bg-sky-800 "
        />

      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >¿Ya tienes una cuenta? Inicia Sesión</Link>

        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/olvide-password"
        >Olvide mi Password</Link>
      </nav>

    </>
  )
}
export default Registrar