import React from 'react';
import Swal from 'sweetalert2';
import { gql, useMutation } from '@apollo/client';

const ELIMINAR_CLIENTE = gql`
mutation eliminarCliente($id: ID!){
    eliminarCliente(id: $id)
  }
`;

const OBTENER_CLIENTES_USUARIO = gql`
query obtenerClientesVendedor {
  obtenerClientesVendedor{
    id
    nombre
    apellido
    empresa
    email
  }
}
`;

const Cliente = ({ cliente }) => {

    // mutation para eliminar cliente
    const [eliminarCliente] = useMutation(ELIMINAR_CLIENTE, {
        update(cache) {
            // obtener una copia del objeto de cache
            const { obtenerClientesVendedor } = cache.readQuery({ query: OBTENER_CLIENTES_USUARIO });

            // reescribir el cache
            cache.writeQuery({
                query: OBTENER_CLIENTES_USUARIO,
                data: {
                    obtenerClientesVendedor: obtenerClientesVendedor.filter(clienteActual => clienteActual.id !== cliente.id)
                }
            })

        }
    });


    // Elimina un cliente
    const confirmarEliminarCliente = (id) => {
        Swal.fire({
            title: 'Estas seguro de eliminar?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'No, cancelar'
        }).then(async (result) => {
            if (result.value) {

                try {
                    // eliminar por id

                    const { data } = await eliminarCliente({
                        variables: {
                            id: id
                        }
                    });
                    console.log(data);

                    //si se elimina correctamente le pasamos la alerta
                    Swal.fire(
                        'Deleted!',
                        data.eliminarCliente,
                        'success'
                    )

                } catch (error) {
                    console.log(error);

                }


            }
        })
    }

    return (
        <tr>
            <td className="border px-4 py-2">{cliente.nombre} {cliente.apellido} </td>
            <td className="border px-4 py-2">{cliente.empresa}  </td>
            <td className="border px-4 py-2">{cliente.email}  </td>
            <td className="border px-4 py-2">
                <button
                    type="button"
                    className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                    onClick={() => confirmarEliminarCliente(cliente.id)}
                >
                    Eliminar
                    <svg viewBox="0 0 20 20" fill="currentColor" className="ban w-4 h-4 ml-2"><path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd"></path></svg>
                </button>
            </td>
        </tr>
    )
}

export default Cliente
