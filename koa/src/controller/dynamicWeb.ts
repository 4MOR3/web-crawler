import * as Koa from 'koa'
import Puppeteer from 'puppeteer';
import Api from '../Api'

async function dynamicWeb(ctx: Koa.Context<Api.BaseApi>, next: Koa.Next): Promise<void> {
  console.log('dy')
  const url = ctx.query.url?.toString();
  if (url && url.startsWith('http')) {
    console.log('success')
    //manipulate(url) 
  } else { 
    ctx.body = {
      code: Api.Code.otherError,
      message: 'invalid url, complete url needed',
      data: {}
    }
  }

  next()
}

async function manipulate(url: string) { 
  let cnt = 0;
  const browser = await Puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url)
  const urlArr = [];
  page.on('request', async (event) => { 
    console.log(cnt++)
    urlArr.push(event.url());
  })

}

export default dynamicWeb