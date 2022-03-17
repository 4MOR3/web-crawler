
import * as Koa from 'koa'
import axios from 'axios';
import cheerio from 'cheerio'
import iconv from 'iconv-lite'
import Api from '../Api'
async function crawler(ctx: Koa.Context, next: Koa.Next): Promise<void>  { 
  const url = ctx.query.url?.toString();
  if (url) { 
    const parser: string[] = url.split('/');
    if (!parser[0].includes('http')) { 
      throw new Error('need full url to identify the protocol(http? https?)')
    }
    // const robotsTxt = await axios(`${parser[0]}//${parser[2]}/robots.txt`)
    // console.log(robotsTxt.data);
    console.log('requesting')
    const resp = await axios({
      responseType: "arraybuffer",
      url: url
    })
    
    console.log('complete')
    let data: Uint8Array | string = resp.data;
    let $ = cheerio.load(data.toString());
    const charset = $('meta').attr('charset')
    
    data = iconv.decode(resp.data, charset || 'utf-8');
    
    $ = cheerio.load(data);
    console.log($)
    ctx.body = {
      message : 'success',
      code: Api.Code.success,
      data: { text:data }
    }
  }
  
  await next()
  
}
export default crawler;