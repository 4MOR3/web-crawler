import  routes from '../router/index'
import { useState, useEffect, useContext } from 'react';
import './MainLayout.scss';
import { Button, Layout, Menu } from 'antd'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { SiderTheme } from 'antd/lib/layout/Sider';
import { globalContext } from '../App'

const { Header, Content, Sider } = Layout;

function MainLayout() { 

  const nav = useNavigate()
  const context = useContext(globalContext)
  useEffect(() => {
    if (!context.login) nav('/login')
  })
  const location = useLocation()
  
  const [theme, setTheme] = useState<SiderTheme>('light')
  const routerList = routes.find(i => i.name === 'master')?.children
    ?.map((data, ind) => {
      if (data.path) {
        return <Menu.Item key={data.path} className='item'>
          {`${data.name}`}
          <Link to={data.path}></Link>
        </Menu.Item>
      } else { 
        return undefined
      }
    })
  return (
    <Layout style={{ minHeight: '100vh' }} className='main-layout'>
      <Sider   theme={theme} >
        <Menu theme={theme} selectedKeys={ [location.pathname] } mode="inline">
          { routerList }
        </Menu>   
        <Button type='primary' 
          className='site-button'
          onClick={() => {
          setTheme(theme === 'light' ? 'dark' : 'light');
        }}>Switch Theme</Button>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Outlet></Outlet>
          </Content>
      </Layout>
    </Layout>
      
    
  );
 }
export default MainLayout;





