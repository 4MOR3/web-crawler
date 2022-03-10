import { RouteObject } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ReactNode } from "react";


import MainLayout from '../MainLayout/MainLayout'

const StaticCrawler = lazy(() => import('../StaticCrawler/StaticCrawler'))

function lazyLoad(children: ReactNode): ReactNode {
  return <Suspense fallback={<h1>Loading...</h1>}>
    {children}
  </Suspense>
}

const routes: RouteObject[] = [
  {
    path: '/',
    element: (<MainLayout/>),
    children: [
      {
        path: '/StaticCrawler',
        element: lazyLoad(<StaticCrawler/>),
      }
    ]
    
  }

]
export default routes