import { message } from 'antd'
import Api from '../Api'


async function fetchPro<T extends Api.BaseApi = Api.BaseApi>(input: RequestInfo, init?: RequestInit | undefined):Promise<T> { 
  const resp = await fetch(input, init);
  if (resp.status >= 400) { 
    message.error(`${resp.status} SERVER ERROR!!!`)
    throw new Error(`${resp.status} SERVER ERROR!!!`)
  }
  const body: T = await resp.json();
  if (body.code) {
    message.warn(body.message);
  }
  return body;
}
export default fetchPro
