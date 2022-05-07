import * as Koa from 'koa'
import axios from 'axios';
import * as cheerio from 'cheerio'
import iconv from 'iconv-lite'
import Api from '../Api'
interface StaticWebApi extends Api.BaseApi { 
  data: {

  }
}
async function staticWeb(ctx: Koa.Context, next: Koa.Next): Promise<void>  { 
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
    let data: Uint8Array  = resp.data;
    let $ = cheerio.load(data.toString());
    const charset = $('meta').attr('charset')
    
    const decoder: string = iconv.decode(resp.data, charset || 'utf-8');
    $ = cheerio.load(decoder);
    interface HJson { 
      tag: string;
      content: string;
      attr: object;
    }
    const elLib: HJson[] = [];
  
    ctx.body = {
      message : 'success',
      code: Api.Code.success,
      data: { text: ctx.context }
    }
  }
  await next()
  
}

interface El extends Object { 
  type: string,
  name: string,
  children: El[],
}
function cheerTrav(body: cheerio.Cheerio) { 
  const res: El[] = [];
  if (body.children()) { 
    body.children().each((ind, el) => { 
     
    })
  }
}

  

export default staticWeb;