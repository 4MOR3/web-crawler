import { message } from 'antd'

interface BaseResData<T = object> { 
  code: number,
  message: string,
  data?: T,
}

async function fetchPro<T = Object>(input: RequestInfo, init?: RequestInit | undefined):Promise<BaseResData<T>> { 
  const resp = await fetch(input, init);
  if (resp.status >= 400) { 
    message.error(`${resp.status} SERVER ERROR!!!`)
    throw new Error(`${resp.status} SERVER ERROR!!!`)
  }
  
  const body: BaseResData<T> = await resp.json();
  if (body.code) { 
    message.warn(`RUNTIME ERROR  ${body.message} `)

  }
  return body;
}
export default fetchPro