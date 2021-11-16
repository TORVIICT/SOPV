
import Index from './pages/index.jsx';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles/css/dashboard.css';
import Ventas from 'pages/ventas.jsx';
import Productos from 'pages/productos.jsx';
import Usuarios from 'pages/usuarios.jsx';
import PrivateRoute from 'components/PrivateRoute';
import { Auth0Provider } from "@auth0/auth0-react";
import Inicio from 'pages/inicio.jsx';


function App() {
  return (
    <Auth0Provider
    domain="sovp.us.auth0.com"
    clientId="FLfzdek3NuBbx0jbN8p6wc7j7alSJzXy"
    redirectUri={window.location.origin}
    audience= 'api-autenticacion-sovp'
    >
    <div class="App">
      <Router>
        <Switch>

         
              <Route path={['/Ventas', '/Productos', '/Usuarios']}>
                  
                  <Route path='/Ventas'>
                        <PrivateRoute>
                      
                        <Ventas />
                      
                        </PrivateRoute>
                      </Route>
                      <Route path='/Productos'>
                        <PrivateRoute>
                      
                        <Productos />
                      
                        </PrivateRoute>
                      </Route>
                      <Route path='/Usuarios'>
                        <PrivateRoute>
                        
                        <Usuarios />
                    
                        </PrivateRoute>
                      </Route>
                </Route>
      

              <Index>
              <Route path='/'>
                  <Inicio />
              </Route>
              </Index>
       
        </Switch>        
      </Router>  
    </div>
    </Auth0Provider>
  );
}

export default App;
