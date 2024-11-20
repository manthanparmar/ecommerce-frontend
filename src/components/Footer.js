// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <div className="copyright">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <p>Copyrights &copy; 2024, All Rights Reserved.</p>
          </div>
          <div className="col-lg-6 text-right col-md-12">
            <div className="social-icons">
              <ul>
                <li><a href="#" target="_blank"><i className="fab fa-facebook-f"></i></a></li>
                <li><a href="#" target="_blank"><i className="fab fa-twitter"></i></a></li>
                <li><a href="#" target="_blank"><i className="fab fa-instagram"></i></a></li>
                <li><a href="#" target="_blank"><i className="fab fa-linkedin"></i></a></li>
                <li><a href="#" target="_blank"><i className="fab fa-dribbble"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
