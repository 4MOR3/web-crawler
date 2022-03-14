import React, { createContext, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import router from './router/index'

interface GlobalContext  {
  login: boolean,
}
const initContext: GlobalContext = {
  login: false,
}

export const globalContext = React.createContext(initContext)

function App() { 

  return <globalContext.Provider value={initContext}>
    {useRoutes(router)}
  </globalContext.Provider>
}

export default App;





