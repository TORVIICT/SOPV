//import PrivateComponent from 'components/PrivateComponent';
import { nanoid } from 'nanoid';
import React, { useState, useEffect } from 'react';
import { editarUsuario } from 'utils/api';
import { obtenerUsuarios } from 'utils/api';
import Layout from 'layouts/layout.jsx';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      await obtenerUsuarios(
        (respuesta) => {
          console.log('usuarios', respuesta.data);
          setUsuarios(respuesta.data);
        },
        (err) => {
          console.log(err);
        }
      );
    };
    fetchUsuarios();
  }, []);

  return (
    
    <div>
      <Layout/>
      <div  className="bg-blue-400 flex  items-center pl-4 border-4 border-light-gray-500 border-opacity-50 h-20 " >
             <h2 className="font-bold font-serif text-5xl text-white ">Admin Usuarios</h2>
        </div>
      {/* <PrivateComponent roleList={['admin']}> */}
        <button className='bg-red-400'>Hola RBAC</button>
      {/* </PrivateComponent> */}
      <table className='table'>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Estado</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((user) => {
            return (
              <tr key={nanoid()}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <EstadoUsuario user={user} />
                </td>
                <td>
                  <RolesUsuario user={user} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const RolesUsuario = ({ user }) => {
  const [rol, setRol] = useState(user.rol);

  useEffect(() => {
    const editUsuario = async () => {
      await editarUsuario(
        user._id,
        { rol },
        (res) => {
          console.log(res);
        },
        (err) => {
          console.error(err);
        }
      );
    };
    if (user.rol !== rol) {
      editUsuario();
    }
  }, [rol, user]);

  return (
    <select value={rol} onChange={(e) => setRol(e.target.value)}>
      <option value='' disabled>
        Seleccione un rol
      </option>
      <option value='admin'>Admin</option>
      <option value='vendedor'>Vendedor</option>
      <option value='sin rol'>Sin rol</option>
    </select>
  );
};

const EstadoUsuario = ({ user }) => {
  const [estado, setEstado] = useState(user.estado ?? '');

  useEffect(() => {
    const editUsuario = async () => {
      await editarUsuario(
        user._id,
        { estado },
        (res) => {
          console.log(res);
        },
        (err) => {
          console.error(err);
        }
      );
    };
    if (user.estado !== estado) {
      editUsuario();
    }
  }, [estado, user]);

  return (
    <select value={estado} onChange={(e) => setEstado(e.target.value)}>
      <option value='' disabled>
        Seleccione un estado
      </option>
      <option value='autorizado' className='text-green-500'>
        Autorizado
      </option>
      <option value='pendiente' className='text-yellow-500'>
        Pendiente
      </option>
      <option value='rechazado' className='text-red-500'>
        Rechazado
      </option>
    </select>
  );
};

export default Usuarios;