import React from 'react';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>India</h4>
          <h4>English</h4>
        </div>

        <div className="footer-section">
          <h4>About Tomato</h4>
          <p>Who We Are</p>
          <p>Blog</p>
          <p>Work With Us</p>
          <p>Investor Relations</p>
          <p>Report Fraud</p>
          <p>Press Kit</p>
          <p>Contact Us</p>
        </div>

        <div className="footer-section">
          <h4>Zomaverse</h4>
          <p>Zomato</p>
          <p>Blinkit</p>
          <p>Feeding India</p>
          <p>Hyperpure</p>
          <p>Zomato Live</p>
          <p>Zomaland</p>
          <p>Weather Union</p>
        </div>

        <div className="footer-section">
          <h4>For Restaurants</h4>
          <p>Partner With Us</p>
        </div>

        <div className="footer-section">
          <h4>Apps For You</h4>
          <p>Learn More</p>
          <p>Privacy</p>
          <p>Security</p>
          <p>Terms</p>
          <p>Sitemap</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners. 2008-2024 © Zomato™ Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
