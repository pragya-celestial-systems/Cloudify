import React from 'react';
import InputField from './components/InputField';
import { AppContextProvider } from './context/App';

function App() {
  return (
   <AppContextProvider>
    <InputField />
   </AppContextProvider>
  );
}

export default App;