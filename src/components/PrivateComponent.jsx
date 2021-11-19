//import { useUser } from 'context/userContext';

import { useAuth0 } from '@auth0/auth0-react';
import React, {useEffect} from 'react';

const PrivateComponent = ({ children }) => {
     const { isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently } = useAuth0();


useEffect(( )=> {
  getAccessTokenSilently();
}, []);

if (isLoading) return <div>Loading...</div>;

if (!isAuthenticated) {
  return <>{children }</>;
}





// const PrivateComponent = ({ roleList, children }) => {
//   const { userData } = useUser();

//   if (roleList.includes(userData.rol)) {
//     return children;
//   }

//   return <></>;
 };

export default PrivateComponent;
