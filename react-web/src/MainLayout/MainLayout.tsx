import { navRoutes } from '../router/index'
import { useState, useEffect, useContext } from 'react';
import './MainLayout.scss';
import { Button, Layout, Menu } from 'antd'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { SiderTheme } from 'antd/lib/layout/Sider';
import { globalContext } from '../App'

const { Header, Content, Sider } = Layout;

function MainLayout() { 

  const nav = useNavigate()
  const { ctx, setCtx } = useContext(globalContext)
  
  useEffect(() => {
    if (!ctx.login) nav('/login')
  })
  const location = useLocation()
  
  const [theme, setTheme] = useState<SiderTheme>('light')
  const RouterList = navRoutes.map((data, ind) => {  
    return <Menu.Item key={data.path} className='item' icon={data.icon} >
      {data.name}
      <Link to={data.path} ></Link>
    </Menu.Item> 
  })
  return (
    <Layout style={{ minHeight: '100vh' }} className='main-layout'>
      <Sider theme={theme} >
        <Menu theme={theme} selectedKeys={ [location.pathname] } mode="inline">
          {RouterList}
        </Menu>   
        <Button type='primary' 
          className='site-button'
          onClick={() => {
            setTheme(theme === 'light' ? 'dark' : 'light');
          }}>
          Switch Theme
        </Button>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} >
          <Button type='dashed' className='logout' onClick={() => { setCtx({login:false}) }}>登出</Button>
        </Header>
          <Content style={{ margin: '0 16px' }}>
            <Outlet></Outlet>
          </Content>
      </Layout>
    </Layout>
      
    
  );
 }
export default MainLayout;





