import { createContext, useContext, useEffect, useMemo, useState, useRef } from "react"

interface FieldState { 
  data: number;
}
interface FieldContext { 
  state: FieldState;
  setState: React.Dispatch<React.SetStateAction<FieldState>>
}
const initContext: FieldContext = {
  state: {
    data: 0,
  },
  setState: () => { }

}
const TestContext = createContext<FieldContext>(initContext)



function TestField() { 
  const [state, setState] = useState<FieldState>({ data: 0 })
  function delay(ms: number):Promise<void> { 
    return new Promise(resolve => { 
      setTimeout(() => { resolve() }, ms);
    })
  }
  async function runner (name: number) {
    const start = Date.now()
    console.log(`${name} starts the race`)
    await delay(Math.random() * 5000)
    console.log(`${name} finishes the race`)
    return { name, delta: Date.now() - start }
  }
  let [cl, setCl] = useState<string>('pink');
  const arr = ['black', 'yellow', 'pink', 'blue']
  const inputRef = useRef<HTMLInputElement>(null)
  function List() { 
    const list = arr.map(data => { 
      return <p
        className={ data }
        style={{ color: data }}>
        Test
      </p>
    })
    return <div>{ list }</div>
  }
  return <div>
    <p style={{ color: cl }}>hello</p>
    <button
      className= "hello" 
      onClick={() => { cl = arr[3] }}>change</button>
    <List></List>
  </div>
  
}
export default TestField