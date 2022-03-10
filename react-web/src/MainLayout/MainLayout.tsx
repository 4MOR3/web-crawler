import React, { useState } from 'react';
import logo from './logo.svg';
import './MainLayout.scss';
import { Layout, Menu } from 'antd'
import { BrowserRouter, Routes, Route, Link, useRoutes } from 'react-router-dom';


import { formatCountdown } from 'antd/lib/statistic/utils';
const { Header, Content, Sider } = Layout;

 function MainLayout() { 
  const [data, setData] = useState<string>('test')
  function click(e: React.MouseEvent) { 
    setData(Math.random().toFixed(7))
  }
  const [collapsed, setCola] = useState<boolean>(false)
  const [theme, setTheme] = useState<string>('light')
  return (
    <Layout style={{ minHeight: '100vh' }} className='main-layout'>
        <Sider collapsible collapsed={collapsed} theme='light' onCollapse={() => { setCola(!collapsed)}}>
          <div className="logo" />
            <Menu theme='light' defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1" >
              
            <Link to={ '/staticCrawler' }>静态页面</Link>
              </Menu.Item>
              <Menu.Item key="2" >
                动态页面
              </Menu.Item>
              <Menu.Item key="9" >
                Files
              </Menu.Item>
            </Menu>
            
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
              
            </Content>
          </Layout>
      </Layout>
  );
 }
export default MainLayout;





