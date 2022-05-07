import { createContext, useState } from 'react'
import { useRoutes } from 'react-router-dom'
import { allRoutes }  from './router/index'

interface GolbalState{ 
  login: boolean
}
interface IGlobalContext {
  ctx: GolbalState
  setCtx: React.Dispatch<React.SetStateAction<GolbalState>>;
}

const initContext: IGlobalContext = {
  ctx: {
    login:false
  },
  setCtx: () => {}
};

export const globalContext = createContext<IGlobalContext>(initContext)

function App() { 
  const [ctx, setCtx] = useState<GolbalState>({login: false})
  return (
    <globalContext.Provider value={{ ctx, setCtx }}>
      {useRoutes(allRoutes)}
    </globalContext.Provider>
  )
}

export default App;





