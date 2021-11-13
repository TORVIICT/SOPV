import logouser from '../media/User.png';
import React from 'react'
import { Link } from 'react-router-dom';

function Index(){
  return(

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
        <div className="absolute right-20 top-3 mr-4 ">
          <Link to="/Login">
        <button type="button" class="btn btn-primary">Iniciar Sesion</button>
        </Link>
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
                    <Link href="/Usuarios" className="nav__dropdown-item">Usuarios</Link>
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
                    
                    <Link href="/Ventas" className="nav__dropdown-item">Ventas</Link>
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

        <Link to="/Login" className="nav__link nav__logout">
          <i className="bx bx-log-out nav__icon"></i>
          <span className="nav__name">Cerrar Sesion</span>
        </Link>
      </nav>
    </div>

    
    <main>

      
  
  
      
    </main>

    
    <script src="assets/js/dashboard.js"></script>
        </div>
    );
}


export default Index;