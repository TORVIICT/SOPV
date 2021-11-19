//import { useUser } from 'context/userContext';

import { useAuth0 } from '@auth0/auth0-react';
import React, {useEffect} from 'react';

const PrivateComponent = ({ children }) => {
     const { isAuthenticated, isLoading, loginWithRedirect , getAccessTokenSilently } = useAuth0();


useEffect(( )=> {
  const fetchAuth0Token = async () => {  
    const accessToken = await getAccessTokenSilently({
      audience= 'api-autenticacion-sovp',                                     
    });
    console.log(accessToken);
  }
  fetchAuth0Token();
}, []);



if (isLoading) return <div>Loading...</div>;

if (!isAuthenticated) {
  return loginWithRedirect()
}

return <>{children}</>;





// const PrivateComponent = ({ roleList, children }) => {
//   const { userData } = useUser();

//   if (roleList.includes(userData.rol)) {
//     return children;
//   }

//   return <></>;
 };

export default PrivateComponent;
