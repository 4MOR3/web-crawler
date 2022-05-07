import { useState, useEffect, useRef, useContext } from "react";
import { Button, Input, Form, message } from "antd";
//import './StaticCrawler.scss'
import { LinkOutlined } from '@ant-design/icons'
import fetchPro from "../../utils/fetchPro";
import { globalContext } from '../../App'

const DOMAIN = 'localhost'
const PORT = '4396'

function DynamicWeb() { 
  
  //const ws: WebSocket  = new WebSocket(`ws://${DOMAIN}:${PORT}/dynamic`)
  useEffect(() => { 
    const ws = new WebSocket(`ws://${DOMAIN}:${PORT}/dynamic`)
    return () => {
      ws.close()
    }
  }, [])

  interface BtnInfo { 
    isLoading: boolean,
    text: string,
  }
  const [btnInfo, setBtnInfo] = useState<BtnInfo>({
    isLoading: false,
    text: 'CRAWL!!!'
  })
  //const [ws, setWs] = useState(new WebSocket(`ws://${DOMAIN}:${PORT}/dynamic`))
  
  async function crawl(e: any) {
    // if (ws.readyState === 3) { 
    //   ws.send(e.url)
    // }
    
    // setBtnInfo({ isLoading: true, text: '启动Puppeteer' })
    // try {
    //   //const body = await fetchPro(`/dynamicWeb?url=${e.url}`);
    //   const body = await fetch('http://localhost:1874/graphql')
    //   console.log(body)
    // } catch (e) { }
    
    // setBtnInfo({ isLoading: false, text: "CRAWL!!!" });
  }
  
  const { ctx, setCtx } = useContext(globalContext)
  return (<div className="sc-container">
    <Form onFinish={crawl}>
      <Form.Item name='url'>
        <Input size="large"
          placeholder="完整网址"
          name='url'
          prefix={<LinkOutlined />}
        />
      </Form.Item>
      <Form.Item>
        <Button loading={btnInfo.isLoading} htmlType='submit'>{ btnInfo.text }</Button>
        <Button onClick={() => {  }}>test logout</Button>
      </Form.Item>
    </Form>
    
    
  </div>)
}


export default DynamicWeb