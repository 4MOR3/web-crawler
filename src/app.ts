import Koa from 'koa'
const app = new Koa()
const msg: string = 'hello the fucking world, suck my ball!'
async function main(ctx: Koa.Context, next: Koa.Next): Promise<void> {
  ctx.body = msg;
}
app.use(main)
app.listen(8001)