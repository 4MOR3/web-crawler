import { useState, useEffect } from "react";
import { Button, Input } from "antd";
import './StaticCrawler.scss'
import { LinkOutlined } from '@ant-design/icons'


function StaticCrawler() { 
  const [cnt, setCnt] = useState<number>(0)
  useEffect(() => { 
    return () => { 

    }
  },[])
  return (<div className="sc-container">
    
    <Input size="large" placeholder="完整网址" prefix={<LinkOutlined />} />
    
    
  </div>)
}
export default StaticCrawler;