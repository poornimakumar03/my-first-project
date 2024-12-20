import React, { useState } from 'react';
import Form from './form';
import ProductsDetail from './ProductDetail';  

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);  

  const handleLoginSuccess = () => {
    setIsAuthenticated(true); 
  };

  const handleLogout = () => {
    setIsAuthenticated(false);  
  };

  return (
    <div>
      {!isAuthenticated ? (
        <Form onLoginSuccess={handleLoginSuccess} />  
      ) : (
        <ProductsDetail onLogout={handleLogout} /> 
      )}
    </div>
  );
};

export default App;
