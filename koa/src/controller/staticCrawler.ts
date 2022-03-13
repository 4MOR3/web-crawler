
import * as Koa from 'koa'
import axios from 'axios';
import cheerio from 'cheerio'
import iconv from 'iconv-lite'

const url: string = 'https://www.w3school.com.cn/';

async function crawler(ctx:Koa.Context, next: Koa.Next):Promise<void>  { 
  console.log('crawler1')
  // 请求robots.txt, 做个有素质的银🤗
  const parser: string[] = url.split('/');
  
  if (!parser[0].includes('http')) { 
    throw new Error('need full url to identify the protocol(http? https?)')
  }
  // const robotsTxt = await axios(`${parser[0]}//${parser[2]}/robots.txt`)
  // console.log(robotsTxt.data);
  const resp = await axios({
    responseType: "arraybuffer",
    url: url
  })
  let data: Uint8Array | string = resp.data;
  let $ = cheerio.load(data.toString());
  const charset = $('meta').attr('charset')
  
  data = iconv.decode(resp.data, charset || 'utf-8');
  ctx.body = data
  $ = cheerio.load(data);
  await next()
  
}
export default crawler;