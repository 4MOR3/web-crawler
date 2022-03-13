import Koa from 'koa'

async function login(ctx: Koa.Context, next: Koa.Next) {
  const key = ctx.query.password;
  console.log(key)
  await next();
}
export default login