import './Login.scss'
import { Form, Input, Button } from 'antd';
import { LockOutlined, LoginOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useRef, useState } from 'react';
import { globalContext } from '../../App'
import { C3DS } from './SimpleThree'
import fetchPro from '../../utils/fetchPro'
import TBG from 'three-background'
const { BasicOcean } = TBG
console.log(BasicOcean)
interface LoginData { 
  code: number,
  message: string
}
function Login() { 
  const { setCtx } = useContext(globalContext);
  const nav = useNavigate();
  async function onFinish(e: any) { 
    try {
      const body = await fetchPro<LoginData>(`/login?password=${e.password}`, { method: 'get' })
      console.log(body)
      if (!body.code) {
        setCtx({ login: true });
        nav(`/`)
      }
    } catch (e) { 
      console.log(e)
    }
  }
  const threeContainer = useRef<HTMLDivElement>(null)
  useEffect(() => { 
    // mounted
      const main: C3DS = new C3DS(threeContainer.current)
      
      main.animate()
    return () => {
      // unmounted
      main.destructor();
    }
  },[])
  return (
    <div className='login-form' ref={threeContainer}>
      <Form
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item name="password">
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder='Enter the CODE'
            className='input'
            size='large'/>
        </Form.Item>
        <Form.Item >
          <Button type="primary" htmlType="submit" size='large' shape='round' icon={ <LoginOutlined/> }>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
export default Login;