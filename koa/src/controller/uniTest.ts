import koa from "koa";

async function uniTest(ctx: koa.Context, next: koa.Next): Promise<void> { 
  function delay(ms: number):Promise<void> { 
    return new Promise(resolve => { 
      setTimeout(() => { 
        resolve()
      }, ms)
    })
  }
  const rand = Math.random() * 10000
  await delay(rand)
  ctx.body = {
    code: 0,
    message: 'success',
    data: {
      number: rand
    }
  }
  next()
}
export default uniTest