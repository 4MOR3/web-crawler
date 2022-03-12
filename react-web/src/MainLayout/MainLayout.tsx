import  routes from '../router/index'
import { useState, useEffect } from 'react';
import './MainLayout.scss';
import { Button, Layout, Menu, Switch } from 'antd'
import { Link, Outlet, Location } from 'react-router-dom';
import { SiderTheme } from 'antd/lib/layout/Sider';


const { Header, Content, Sider } = Layout;
function MainLayout() { 
   

  const [theme, setTheme] = useState<SiderTheme>('light')
  const routerList = routes.find(i => i.name === 'master')?.children
    ?.map((data, ind) => {
      if (data.path) {
        return <Menu.Item key={ind.toString()} className='item'>
          {data.name}
          <Link to={data.path}></Link>
        </Menu.Item>
      } else { 
        return ''
      }
    })
  return (
    
    <Layout style={{ minHeight: '100vh' }} className='main-layout'>
      <Sider collapsible  theme={theme} >
        <Menu theme={theme} defaultSelectedKeys={['1']} mode="inline">
          { routerList }
        </Menu>   
        <Button type='primary' 
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





