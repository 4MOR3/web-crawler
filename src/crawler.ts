
import * as Koa from 'koa'
import axios from 'axios';
import cheerio from 'cheerio'
import iconv from 'iconv-lite'

const url: string = 'https://segmentfault.com/a/1190000040247602';

async function crawler(ctx:Koa.Context, next: Koa.Next):Promise<void>  { 
  console.log('crawler1')
  
  // 请求robots.txt, 做个有素质的银🤗
  const parser: string[] = url.split('/');
  if (!parser[0].includes('http')) { 
    throw new Error('need full url(http? https?)')
  }
  
  await axios(`${parser[0]}//${parser[2]}/robots.txt`)
    .then(resp => { 
      console.log(resp.data);
    })
  await axios({
    responseType: "arraybuffer",
    url: url
  }).then(resp => {
    
    let data: string = resp.data;
    let $ = cheerio.load(data);
    const charset = $('meta').attr('charset')

    // 根据编码格式进行解码
    if (charset) {
      data = iconv.decode(resp.data, charset);
      $ = cheerio.load(data);
    }
    ctx.body = $.html();
    
  })
  await next()
  
}
export default crawler;