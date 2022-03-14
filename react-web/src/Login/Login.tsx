import './Login.scss'
import { Form, Input, Button } from 'antd';
import { LockOutlined, LoginOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useRef } from 'react';
import { globalContext } from '../App'
import { C3DS } from './SimpleThree'


function Login() { 
  const context = useContext(globalContext)
  const nav = useNavigate();
  
  async function onFinish(e: any) { 
    const resp = await fetch(`/login?password=${e.password}`)
    const data = await resp.json();
    if (data.flag) { 
      context.login = true;
      nav(`/`)
    }
  }

  const threeContainer = useRef<HTMLDivElement>(null)
  useEffect(() => { 
    // mounted()
    const main: C3DS = new C3DS()
    main.init(threeContainer.current)
    main.animate()


    return () => { 
      // unmounted()
      main.destructor();
    }
  },[])
  return (
    <div className='login-form' ref={threeContainer} >
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