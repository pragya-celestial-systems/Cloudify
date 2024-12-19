import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import CloudIcon from '@mui/icons-material/Cloud';
import Typography from '@mui/material/Typography';
import InputField from './InputField';
import './css/header.css';

export default function SearchAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ background: 'transparent', boxShadow: 'none', padding: '2rem' }}
      >
        <Toolbar>
          <CloudIcon
            className='cloudIcon'
          />
          <Typography
            variant="h4"
            noWrap
            component="div"
            id='logo'
            sx={{  display: { xs: 'none', sm: 'block' } }}
          >
            Cloudify
          </Typography>
          <InputField />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
