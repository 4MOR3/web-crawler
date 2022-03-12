import './Login.scss'
import { Form, Input, Button } from 'antd';
import { LockOutlined } from '@ant-design/icons';

function Login() { 
  function onFinish() { }
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