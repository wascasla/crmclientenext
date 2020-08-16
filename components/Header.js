import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';

const OBTENER_USUARIO = gql`
query obtenerUsuario{
    obtenerUsuario{
      id
      nombre
      apellido
    }
  }

`;

const Header = () => {

    const router = useRouter();

    // query de apollo
    const { data, loading, error } = useQuery(OBTENER_USUARIO);

    if (loading) return null;

    // Si no hay informacion (token)
    if (data === void 0 || data === null || data === undefined) {
        return router.push('/login');
    }

    const { nombre, apellido } = data.obtenerUsuario;

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        router.push('/login');
    }

    return (
        <div className="flex justify-between mb-6">
            <p className="mr-2">Hola {nombre} {apellido} </p>

            <button
                onClick={() => cerrarSesion()}
                className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md"
                type="button">
                Cerrar Sesión
            </button>
        </div>
    )
}

export default Header
