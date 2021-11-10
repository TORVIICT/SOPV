import logouser from '../media/User.png';

function Index(){
  return(

<div>

<header className="header">
      <div className="header__container">
        <img src={logouser} alt="" className="header__img"/>

        <a href="#" className="header__logo">TeraKodi</a>

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
          <a href="#" className="nav__link nav__logo">
            <i className="bx bx-bolt-circle nav__icon"></i>
            <span className="nav__logo-name">TeraKodi</span>
          </a>

          <div className="nav__list">
            <div className="nav__items">
              <h3 className="nav__subtitle">Users</h3>

              <a href="#" className="nav__link active">
                <i className="bx bx-home nav__icon"></i>
                <span className="nav__name">Home</span>
              </a>

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
                    <a href="/Usuarios" className="nav__dropdown-item">Users</a>
                    <a href="#" className="nav__dropdown-item">Rols</a>
                    <a href="#" className="nav__dropdown-item">Account</a>
                    <a href="#" className="nav__dropdown-item">Registers</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="nav__items">
              <h3 className="nav__subtitle">Menu</h3>

              <div className="nav__dropdown">
                <a href="#" className="nav__link">
                  <i className='bx bx-store-alt nav__icon'></i>
                  <span className="nav__name">Products</span>
                  <i
                    className="bx bx-chevron-down nav__icon nav__dropdown-icon"
                  ></i>
                </a>

                <div className="nav__dropdown-collapse">
                  <div className="nav__dropdown-content">
                    <a href="/productos" className="nav__dropdown-item">Inventary</a>
                    
                    <a href="/Ventas" className="nav__dropdown-item">Sales</a>
                    <a href="#" className="nav__dropdown-item">Reports</a>
                  </div>
                </div>
              </div>

              <a href="#" className="nav__link">
                <i className='bx bx-cog nav__icon'></i>
                <span className="nav__name">Settings</span>
              </a>
            </div>
          </div>
        </div>

        <a href="login.html" className="nav__link nav__logout">
          <i className="bx bx-log-out nav__icon"></i>
          <span className="nav__name">Logout</span>
        </a>
      </nav>
    </div>

    
    <main>

      
  
  
      
    </main>

    
    <script src="assets/js/dashboard.js"></script>
</div>

);
}


export default Index;