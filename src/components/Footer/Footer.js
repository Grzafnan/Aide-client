import React from 'react';
import './Footer.css'

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="footer-col">
              <h4>Our Company</h4>
              <ul>
                <li><a href="/">About Us</a></li>
                <li><a href="/">Our Services</a></li>
                <li><a href="/">Privacy Policy</a></li>
                <li><a href="/">Affiliate Program</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Get Help</h4>
              <ul>
                <li><a href="/">FAQ</a></li>
                <li><a href="/">Shipping</a></li>
                <li><a href="/">Returns</a></li>
                <li><a href="/">Order Status</a></li>
                <li><a href="/">Payment Methods</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Online Shop</h4>
              <ul>
                <li><a href="/">Fashion</a></li>
                <li><a href="/">Watch</a></li>
                <li><a href="/">SmartPhone</a></li>
                <li><a href="/">Laptop</a></li>
                <li><a href="/">Electronics</a></li>
                <li><a href="/">Grocery</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Follow Us</h4>
              <div className="social-links">
                <a href="/">
                  <span className="fab fa-facebook-f"></span>
                  <span className="fab fa-facebook-f"></span>
                </a>
                <a href="/">
                  <span className="fab fa-twitter"></span>
                  <span className="fab fa-twitter"></span>
                </a>
                <a href="/">
                  <span className="fab fa-instagram"></span>
                  <span className="fab fa-instagram"></span>
                </a>
                <a href="/">
                  <span className="fab fa-linkedin-in"></span>
                  <span className="fab fa-linkedin-in"></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </>
  );
};

export default Footer;