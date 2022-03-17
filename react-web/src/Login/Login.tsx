import './Login.scss'
import { Form, Input, Button, message } from 'antd';
import { LockOutlined, LoginOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useRef } from 'react';
import { globalContext } from '../App'
import { C3DS } from './SimpleThree'
import  fetchPro  from '../utils/fetchPro'

interface LoginData { 
  code: number,
  message: string
}
function Login() { 
  const context = useContext(globalContext)
  const nav = useNavigate();
  
  async function onFinish(e: any) { 
    
    const resp = await fetch('')
    const data = resp.json()
    console.log(data)
    const body = await fetchPro<LoginData>(`/login?password=${e.password}`)
    console.log(body)
    if (!body.code) {
      context.login = true;
      nav(`/`)
    } else { 
      message.error(body.message)
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
      console.log(main.camera);
      console.log(main.controls)
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