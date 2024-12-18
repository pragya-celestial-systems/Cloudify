import React, { createContext, useContext, useState } from 'react';

interface WeatherInterface {
  [key: string]: string | number | (string | number)[]
}

interface AppInterface {
  data: WeatherInterface;
  setData: (newData: WeatherInterface) => void;
}

// dummy objet to avoid error when accessing the value of context
const defaultValue: AppInterface = {
  data: {},
  setData: () => {},
};

const AppContext = createContext<AppInterface>(defaultValue);

export function AppContextProvider({ children }: React.PropsWithChildren) {
  const [data, setData] = useState<WeatherInterface>({});
  
  return (
    <AppContext.Provider value={{ data, setData }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const contextValue = useContext(AppContext);
  return contextValue;
}
