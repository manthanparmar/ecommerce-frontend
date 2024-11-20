// src/components/Header.js
import React from 'react';

const Header = () => {
  return (
    <>
    <div className="top-header-area" id="sticker">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-sm-12 text-center">
            <div className="main-menu-wrap">
              <div className="site-logo">
                <a href="/">
                  <img src="/assets/img/logo.png" alt="Fruitkha" />
                </a>
              </div>
              <nav className="main-menu">
                <ul>
                  <li className="current-list-item"><a href="/">Home</a></li>
                  <li><a>About</a></li>
                  <li><a >Pages</a></li>
                  <li><a>Contact</a></li>
                  <li>
                    <div className="header-icons">
                      <a className="cart-btn" href="/cart"><i className="fas fa-shopping-cart pl-2 pr-2"></i></a>
                    </div>
                  </li>
                </ul>
              </nav>
              <div className="mobile-menu"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
     <div className="hero-area hero-bg">
     <div className="container">
       <div className="row">
         <div className="col-lg-9 offset-lg-2 text-center">
           <div className="hero-text">
             <div className="hero-text-tablecell">
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
   </>
  );
};

export default Header;
