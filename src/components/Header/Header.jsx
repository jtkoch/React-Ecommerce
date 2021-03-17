import React from 'react';
import { Typography, Button } from '@material-ui/core';
import background from '../../images/background1.jpg';

const Header = () => {
  return (
    <header>
      <div 
        style={{ 
          backgroundImage: `url(${background})`, 
          backgroundPosition: 'top', 
          backgroundSize: 'cover', 
          height: '100vh',
        }} >
        <div style={{ paddingTop: '25vh', width: '100%', display: 'flex', flexDirection: 'column', justifyItems: 'center', alignItems: 'center', alignContent: 'center', textAlign: 'center' }}>
          <Typography variant="h2" gutterBottom style={{ color: 'black' }}>Buzzed</Typography>
          <Typography variant="subtitle1" gutterBottom style={{ color: 'black', marginBottom: '30px' }}>Get coffee shipped right to your doorstep from the nation's top roasters!</Typography>
          <Button href="#shop" variant="outlined" variant="contained" color="secondary" >Shop Coffee</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
