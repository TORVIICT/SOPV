
import Index from './pages/index.jsx';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles/css/dashboard.css';
//import './styles/css/ventas.css';
//import Usuarios from 'pages/usuarios.jsx';
import Ventas from 'pages/ventas.jsx';
import Productos from 'pages/productos.jsx';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch> 
         
          <Route path='/Ventas'>
            
              <Ventas />

          </Route>
          <Route path='/Productos'>
            
              <Productos />

          </Route>
          <Route path='/'>

              <Index />
              
          </Route>
       
        </Switch>        
      </Router>  
    </div>
  );
}

export default App;
