import ws from 'ws'
function sendPro(data: string | number | object) {
  
}
interface Route { 
  path: string;
  handler: () => void;
}
class wsRouter { 
  controllers: Route[] = [];
  constructor() { }
  use(path: string, handler: () => void) {
    this.controllers.push({ path, handler });
  }
  excute(path:string) { 
    this.controllers.filter(data => { 
      return data.path === path
    }).forEach(data => { 
      data.handler();
    })
  }
}
function msgParser(msg: ws.RawData) {
  const formatter = {
    "Array": function (msg: Buffer[]) { 
      console.warn("不支持")
    },
    "Buffer": function (msg:Buffer) { 
      return JSON.parse(msg.toString())
    },
    "ArrayBuffer": function (msg:ArrayBuffer) { 
      return this["Buffer"](Buffer.from(msg))
    }
  }
  formatter
}
export { wsRouter }