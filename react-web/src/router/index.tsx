import './index.scss'
import { Spin } from "antd";
import { LoadingOutlined, BugOutlined, ApiOutlined } from '@ant-design/icons';
import { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";
import { ReactNode } from "react";
import Login from '../Views/Login/Login'
import MainLayout from '../MainLayout/MainLayout'

import Home from'../Views/Home/Home'
const TestField = lazy(()=>import ('../Views/TestField/TestField'))
const StaticCrawler = lazy(() => import('../Views/StaticCrawler/StaticCrawler'))
const DynamicWeb = lazy(() => import('../Views/DynamicWeb/DynamicWeb'))
const ApiTest = lazy(() => import('../Views/ApiTest/ApiTest'))
function lazyLoad(children: ReactNode): ReactNode {
  return <Suspense fallback={
    <div className="router-loading">
      <Spin
        className="icon"
        indicator={<LoadingOutlined style={{ fontSize: 36 }}></LoadingOutlined>}>
      </Spin>
      <h1>LOADING...</h1>
    </div>}>
    {children}
  </Suspense>
}
interface ProRouteObject extends RouteObject { 
  path: string;
  name?: string ;
  children?: ProRouteObject[];
  auth?: number,
  icon?: JSX.Element
}
const navRoutes: ProRouteObject[] = [
  {
    path: '',
    element: (<Home/>)
  },
  {
    name: '静态网页爬取',
    path: '/StaticCrawler',
    element: lazyLoad(<StaticCrawler />),
    icon: (<BugOutlined></BugOutlined>)
  },
  {
    name: '动态网页爬取',
    path: '/DynamicWeb',
    element: lazyLoad(<DynamicWeb />),
    icon: (<BugOutlined></BugOutlined>)
  },
  {
    name: '试验田',
    path: '/TestField',
    element: lazyLoad(<TestField />)
  },
  {
    name: 'Api测试',
    path: '/ApiTest',
    element: lazyLoad(<ApiTest />),
    icon: <ApiOutlined/>,
  }
]
const allRoutes: ProRouteObject[] = [
  {
    path: '/',
    name: 'master',
    element: (<MainLayout/>),
    children: navRoutes
  },
  {
    path: '/login',
    name: 'login',
    element: <Login></Login>
  }
]

export { allRoutes, navRoutes }