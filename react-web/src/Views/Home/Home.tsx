import { SyntheticEvent } from "react"

function Home() { 
  function foo(e: SyntheticEvent){ 
    const target = e.nativeEvent.target
    if (target instanceof HTMLInputElement) { 
      target.style.width = `${target.value.length}em`
    }
  }
  return <div><input onInput={foo}/> </div>
}
export default Home