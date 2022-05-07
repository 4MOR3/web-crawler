import { useEffect } from "react"

function useWs(url: string | URL) { 
  const ws: WS = new WS(url);
  useEffect(() => { 
    ws.connect();
    return () => { 
      ws.disconnect();
    }
  },[])
  
}

class WS { 
  websocket: WebSocket | undefined;
  url: string | URL;
  subjectiveState: boolean = false;
  constructor(url: string | URL) {
    this.url = url
  }
  connect() { 
    this.subjectiveState = true;
    const ws = new WebSocket(this.url);
    ws.onmessage = function (e: MessageEvent) { 
      console.log(e.data)
    }
    function foo() { }
  }
  send<T = any>(data: T) { 
    if (this.subjectiveState) {
      if (this.websocket?.readyState === 1) { 
        this.websocket.send(JSON.stringify(data))
      }
    } else { 

    }
  }
  disconnect() { }
  private reconnect() { 

  }
  

}

export default useWs