import './index.scss'
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import Login from '../Login/Login'
import MainLayout from '../MainLayout/MainLayout'
import { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";
import { ReactNode } from "react";
import Haokan  from'../Haokan/Haokan'
const StaticCrawler = lazy(() => import('../StaticCrawler/StaticCrawler'))
const icon = <LoadingOutlined style={{ fontSize: 36 }} spin />;

function lazyLoad(children: ReactNode): ReactNode {
  return <Suspense fallback={
    <div className="router-loading">
      <Spin className="icon" indicator={icon}></Spin>
      <h1>LOADING...</h1>
    </div>}>
    {children}
  </Suspense>
}

interface ProRouteObject extends RouteObject { 
  name?: string ;
  children?: ProRouteObject[] ;
}
const routes: ProRouteObject[] = [
  {
    path: '/',
    name: 'master',
    element: (<MainLayout/>),
    children: [
      {
        path: '',
        element: (<Haokan></Haokan>)
      },
      {
        name: '静态网页爬取',
        path: '/StaticCrawler',
        element: lazyLoad(<StaticCrawler/>),
      },
      {
        name: '动态',
        path: '',
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    element: <Login></Login>
  }
]
export default routes