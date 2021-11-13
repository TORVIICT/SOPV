import React from 'react'
//import '../styles/css/login.css';
import { Link } from 'react-router-dom';


const login = () => {
    return (
        <div>
            <html lang="en">

            
           
  <body>
      
    <div class="login">
    <Link to="/">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
  <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
</svg>
            </Link>

    

      <div class="login__content">
        <div class="login__img">
          <img src="assets/img/TE.svg" alt="" />
        </div>

        <div class="login__forms">
          <form action="" class="login__register" id="login-in">
            <h1 class="login__title">Sign In</h1>

            <div class="login__box">
              <i class="bx bx-user login__icon"></i>
              <input type="text" placeholder="Username" class="login__input" />
            </div>

            <div class="login__box">
              <i class="bx bx-lock-alt login__icon"></i>
              <input
                type="password"
                placeholder="Password"
                class="login__input"
              />
            </div>

            <a href="#" class="login__forgot">Forgot password?</a>

            <a href="dashboard.html" class="login__button">Sign In</a>

            <div>
              <span class="login__account">Don't have an Account ?</span>
              <span class="login__signin" id="sign-up">Sign Up</span>
            </div>
          </form>

          <form action="" class="login__create none" id="login-up">
            <h1 class="login__title">Create Account</h1>

            <div class="login__box">
              <i class="bx bx-user login__icon"></i>
              <input type="text" placeholder="Username" class="login__input" />
            </div>

            <div class="login__box">
              <i class="bx bx-at login__icon"></i>
              <input type="text" placeholder="Email" class="login__input" />
            </div>

            <div class="login__box">
              <i class="bx bx-lock-alt login__icon"></i>
              <input
                type="password"
                placeholder="Password"
                class="login__input"
              />
            </div>

            <a href="#" class="login__button">Sign Up</a>

            <div>
              <span class="login__account">Already have an Account ?</span>
              <span class="login__signup" id="sign-in">Sign In</span>
            </div>

            <div class="login__social">
              <a href="#" class="login__social-icon"
                ><i class="bx bxl-google"></i
              ></a>
            </div>
          </form>
        </div>
      </div>
    </div>

    
    <script src="../assets/js/main.js"></script>
  </body>
</html>
            
        </div>
    )
}

export default login
