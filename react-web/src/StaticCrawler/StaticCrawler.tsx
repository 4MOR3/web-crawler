import { useState, useEffect } from "react";
import { Button, Input, Form, message } from "antd";
import './StaticCrawler.scss'
import { LinkOutlined } from '@ant-design/icons'
import fetchPro from "../utils/fetchPro";



function StaticCrawler() {  
  useEffect(() => { 
    console.log('mounted')
    return () => { 

    }
  }, [])
  useEffect(() => { console.log('update')})
  let url: string;
  interface BtnInfo { 
    isLoading: boolean,
    text: string,
  }
  const [btnInfo, setBtnInfo] = useState<BtnInfo>({
    isLoading: false,
    text: 'CRAWL!!!'
  })
  
  async function crawl(e: any) {
    setBtnInfo( { isLoading: true, text: 'CRAWLING...' } )
    try {
      const body = await fetchPro(`/staticCrawler?url=${e.url}`);
      console.log(body)
    } catch (e) { }
    setBtnInfo({ isLoading: false, text: "CRAWL!!!" });
  }
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
      </Form.Item>
    </Form>
    
    
  </div>)
}
export default StaticCrawler;