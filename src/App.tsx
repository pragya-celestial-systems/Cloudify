import React from 'react';
import InputField from './components/InputField';
import { AppContextProvider } from './context/App';
import { makeStyles } from '@mui/styles';
import WeatherBox from './components/WeatherBox';

const useStyles = makeStyles({
  container: {
    width: '80vw',
    margin: 'auto',
  },
  heading: {
    textAlign: 'center',
    margin: '2rem',
    color: 'white',
  },
  boxContainer: {
    display: 'flex',
    marginTop: '3rem',
  },
  leftBox: {
    width: '65%',
    height: '100%',
    backdropFilter: 'blur(6px)',
    background: '#4747475',
  },
  rightBox: {
    width: '35%',
  },
});

function App() {
  const classes = useStyles();

  return (
    <AppContextProvider>
      <main className={classes.container}>
        <h1 className={classes.heading}>Cloudify</h1>
        <InputField />
        <div className={classes.boxContainer}>
          <div className={classes.leftBox}>
            <WeatherBox />
          </div>
          <div className={classes.rightBox}></div>
        </div>
      </main>
    </AppContextProvider>
  );
}

export default App;