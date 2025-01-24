import React from 'react';
import logo from '../assets/images/logo.png'; 

const Header = () => {
    return (
      <header className="bg-primary text-white p-3">
        <div className="container d-flex justify-content-center align-items-center">
          
          <img 
            src={logo} 
            alt="Logo" 
            className="rounded-circle" 
            style={{ width: '90px', height: '90px' }} 
          />
        </div>
      </header>
    );
  };
  
  export default Header;
