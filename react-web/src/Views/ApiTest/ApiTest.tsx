import { Button, Input } from "antd";
import fetchPro from "../../utils/fetchPro";

function ApiTest() { 
  
  let inputVal: string = '';
  
  function fetchApiTest() { 
    fetchPro('/externalApi', {
      method: 'post',
      body: inputVal,
      headers: {"content-type":'application/json'}
    })
  }
  const dom = <div>
    <Input onInput={(e) => { inputVal = e.currentTarget.value }}>
    </Input>
    <Button onClick={fetchApiTest}>测试API</Button>
  </div>
  return dom
}
export default ApiTest