
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const Form = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const validEmail = 'poornimakumar211@gmail.com';
  const validPassword = 'Compunet@123';

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === validEmail && password === validPassword) {
      onLoginSuccess();  
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <Box
          className="form-container"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '300px',   
            padding: '20px',
            borderRadius: '8px',
            boxShadow: 3,    
            backgroundColor: '#fff',
            margin: 'auto',    
            marginTop: '100px', 
          }}
        >
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ marginBottom: '15px' }} 
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ marginBottom: '15px' }} 
          />
          <Button 
            className="submit-button" 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth
          >
            Login
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Form;
