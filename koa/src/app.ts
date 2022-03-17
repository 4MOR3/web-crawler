import Koa from 'koa'
import Router from './router'
import Api from './Api'


declare module 'koa' { 
  interface Context<T = Api.BaseApi> { 
    body: T
  }
}
async function handler(ctx: Koa.Context<Api.BaseApi>, next: Koa.Next): Promise<void>{
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
  await next()
}

const app = new Koa()
app.use(handler)
app.use(main)
app.use(Router.routes());
app.use(Router.allowedMethods());

app.listen(4396)