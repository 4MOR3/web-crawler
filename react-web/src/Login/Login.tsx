import './Login.scss'
import { Form, Input, Button } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'

function Login() { 
  const nav = useNavigate();
  async function onFinish(e: any) { 
    const resp = await fetch(`/login?password=${e.password}`)
    const data = await resp.json();
    if (data.flag) { 
      nav(`/staticCrawler`)
    }
  }
  function onFinishFailed() { }
  return (
    <div className='login-form'>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="password"
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder='Enter the CODE'
            className='input' />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 7, span: 16 }}>
          <Button type="primary" htmlType="submit" size='large' shape='round'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
export default Login;