import Koa from 'koa'
import Router from 'koa-router'
import staticCrawler from './controller/staticCrawler';
import login from './controller/login';
const router = new Router()
router.get('/login', login)
router.get('/staticCrawler',staticCrawler)
export default router;