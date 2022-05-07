
import { IncomingMessage } from 'http';
import  Puppeteer  from 'puppeteer';
import ws from 'ws'
let counter = 0;
const serverRepo: ws.Server[] = []
async function wsService(websocket: ws.WebSocket, request: IncomingMessage) {
  // const pptr = await Puppeteer.launch();
  // const page = await pptr.newPage();
  
  serverRepo.push()
  console.log(`connected, running: ${++counter}`)
  websocket.on('message', (msg: ws.RawData) => { 
    
    console.log(msg)
    const data = JSON.parse(msg.toLocaleString())
  })
  websocket.on('close', (e: any) => {
    counter--;
    console.log(`closed, reamin: ${counter}`)
  })
  
}

export default wsService