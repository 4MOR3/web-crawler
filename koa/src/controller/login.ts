import Koa from 'koa'

async function login(ctx: Koa.Context, next: Koa.Next) {
  const key = ctx.query.password;
  key === "990121"
    ? ctx.response.body = { flag: 1 }
    : ctx.body = {flag: 0};
  console.log(key)
  console.log(ctx.body)
  
  await next();
}
export default login