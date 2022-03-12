import { useState, useEffect } from "react";
import { Button } from "antd";


function StaticCrawler() { 
  const [cnt, setCnt] = useState<number>(0)
 
  return (<>
    <h1>{cnt}</h1>
    
  </>)
}
export default StaticCrawler;