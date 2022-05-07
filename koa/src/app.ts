import Koa from 'koa'
import Router from './router'
import Api from './Api'
import { Server } from 'http';
import wsService from './ws/wsService'
import * as ws from 'ws'

const PORT: number = 4396;

declare module 'koa' { 
  interface Context<T extends Api.BaseApi = Api.BaseApi> { 
    body: T
  }
}
async function errHandler(ctx: Koa.Context, next: Koa.Next): Promise<void>{
  try {
    await next();
  } catch (err: any) {
    console.log('err caught')
    console.log(err.toString())
    ctx.body = {
      code: 2,
      message: err.toString(),
      data: {}
    }
  }
};

async function main(ctx: Koa.Context, next: Koa.Next): Promise<void> {
  console.log('main')
  await next()
}

const app = new Koa()
app.use(errHandler)
app.use(main)
app.use(Router.routes());
app.use(Router.allowedMethods());

const server: Server = app.listen(PORT)
const wsServer = new ws.Server({ server: server })

wsServer.on('connection', wsService)
