import Koa from 'koa'
import Router from './router'

async function handler (ctx: Koa.Context, next:Koa.Next) :Promise<void>{
  try {
    await next();
  } catch (err) {
    console.log('err caught')
    console.log(err)
    ctx.body = err;
  }
};

async function main(ctx: Koa.Context, next: Koa.Next): Promise<void> {
  console.log('main1')
  await next()
  console.log('main2')
}

const app = new Koa()
app.use(handler)
app.use(main)
app.use(Router.routes());
app.use(Router.allowedMethods());

app.listen(4396)