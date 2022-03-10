import { RouteObject } from "react-router-dom";
import { lazy } from "react";
import MainLayout from '../MainLayout/MainLayout'

const routes: RouteObject[] = [
  {
    path: '/',
    element: (<MainLayout/>),
    children: [
      {
        path: '/StaticCrawler',
        element: () => import('../StaticCrawler/StaticCrawler'),
      }
    ]
    
  }

]
export default routes