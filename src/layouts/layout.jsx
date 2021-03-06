import React from 'react'
import logouser from '../media/User.png';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";


const Layout = () => {

  const { user, logout } = useAuth0();

  const cerrarSesion = () => {
    logout({ returnTo: window.location.origin });
    localStorage.setItem('token', null);
  };


    return (
    
     
        <div className='mainContainer'>
      <header className="header">
<div className="header__container">
  <img src={logouser} alt="" className="header__img"/>

  <Link to="/" className="header__logo" >SOVP</Link>

  <div className="header__search">
    <input type="search" placeholder="Search" className="header__input" />
    <i className="bx bx-search header__icon"></i>
  </div>

  <div className="header__toggle">
    <i className="bx bx-menu" id="header-toggle"></i>
  </div>
</div>
</header>


<div className="nav" id="navbar">
<nav className="nav__container">
  <div>
    <Link to="/" className="nav__link nav__logo">
      <i className="bx bx-bolt-circle nav__icon"></i>
      <span className="nav__logo-name">SOVP</span>
    </Link>

    <div className="nav__list">
      <div className="nav__items">
        <h3 className="nav__subtitle">Users</h3>
        <div >
        <button
        className="bg-gray-300 p-1 my-2 hover:bg-indigo-900 flex-coll w-full items-center text-white rounded-md">
        {user ? ( 
        <> <img src={user.picture} className='h-5 w-5 rounded-full' />
        {user.name} {user.email}  </>
        ):( 
         <> </>
         )}
         </button>
        </div>

        <Link to="/" className="nav__link active">
          <i className="bx bx-home nav__icon"></i>
          <span className="nav__name">Home</span>
        </Link>

        <div className="nav__dropdown">
          <a href="#" className="nav__link">
            <i className="bx bx-user nav__icon"></i>
            <span className="nav__name">Users</span>
            <i
              className="bx bx-chevron-down nav__icon nav__dropdown-icon"
            ></i>
          </a>

          <div className="nav__dropdown-collapse">
            <div className="nav__dropdown-content">
              <Link to="/Usuarios" className="nav__dropdown-item">Usuarios</Link>
              <a href="#" className="nav__dropdown-item">Registers</a>
            </div>
          </div>
        </div>
      </div>

      <div className="nav__items">
        <h3 className="nav__subtitle">Menu</h3>

        <div className="nav__dropdown">
          <Link to="/Productos" className="nav__link">
            <i className='bx bx-store-alt nav__icon'></i>
            <span className="nav__name">Productos</span>
            <i
              className="bx bx-chevron-down nav__icon nav__dropdown-icon"
            ></i>
          </Link>

          <div className="nav__dropdown-collapse">
            <div className="nav__dropdown-content">
              <Link to="/Productos" className="nav__dropdown-item">Inventario</Link>
              
              <Link to="/Ventas" className="nav__dropdown-item">Ventas</Link>
              <a href="#" className="nav__dropdown-item">Reports</a>
            </div>
          </div>
        </div>

        <a href="#" className="nav__link">
          <i className='bx bx-cog nav__icon'></i>
          <span className="nav__name">Ajustes</span>
        </a>
      </div>
    </div>
  </div>

  <button className="nav__link nav__logout" onClick={() => cerrarSesion()}>
      <i className="bx bx-log-out nav__icon"></i>
      <span className="nav__name">Cerrar Sesion</span>
  </button>
</nav>
</div>


<main>





</main>


<script src="assets/js/dashboard.js"></script>
        </div>
    
    );
}

export default Layout
  