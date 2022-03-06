import * as Koa from 'koa'
import crawler from './crawler';


const app = new Koa.default()
async function handler (ctx:Koa.Context, next:Koa.Next) :Promise<void>{
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
app.use(handler)
app.use(main)
app.use(crawler)
app.listen(4396)