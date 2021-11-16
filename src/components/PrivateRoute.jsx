//import { useUser } from 'context/userContext';
import React, {useEffect} from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { obtenerDatosUsuario } from 'utils/api.js';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchAuth0Token = async () =>{
    const accessToken = await getAccessTokenSilently({
      audience: 'api-autenticacion-sovp',
    })
    localStorage.setItem('token', accessToken);
    await obtenerDatosUsuario (

      (response) => {
        console.log('response', response);
      },
      (err) => {
        console.log('err', err);
      }
    );
  }
  if (isAuthenticated) {
    fetchAuth0Token();
  }
}, [isAuthenticated, getAccessTokenSilently]);

  if (isLoading) return <div>loading....</div>

  return isAuthenticated ? <>{children}</>:<div className='text-9xl text-red-500 '>No estás autorizado para ver este sitio.</div>;
};




// const PrivateRoute = ({ roleList, children }) => {
//   const { userData } = useUser();

//   if (roleList.includes(userData.rol)) {
//     return children;
//   }

//   return <div className='text-9xl text-red-500 '>No estás autorizado para ver este sitio.</div>;
// };

export default PrivateRoute;
