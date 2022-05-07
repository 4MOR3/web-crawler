import axios from 'axios'
import KOA from 'koa'

async function exteranlApi(ctx: KOA.Context, next: KOA.Next) { 
  console.log(ctx.header)
  const resData = await new Promise<any>(resolve => { 
    ctx.req.on('data', chunk => {
      resolve(chunk)
    })
  })
  const res = await axios.get(resData.toString())
  ctx.body = {
    code: 0,
    message: 'testing',
    data: res.data
  }
  // ctx.req.on('data', (chunk) => { 
  //   tempChunk = JSON.stringify(chunk)
  //   console.dir(tempChunk)
  //   ctx.body = {
  //     code: 0,
  //     message: 'testing...',
  //     data: chunk
  //   }
  // })
  
  await next();

}
export default exteranlApi;