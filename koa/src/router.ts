import Router from 'koa-router'
import staticWeb from './controller/staticWeb';
import login from './controller/login';
import dynamicWeb from './controller/dynamicWeb';
import uniTest from './controller/uniTest';
import exteranlApi from './controller/externalApi';

const router = new Router()

router.get('/login', login)
router.get('/staticWeb', staticWeb)
router.get('/dynamicWeb', dynamicWeb)
router.get('/uniTest', uniTest)
router.post('/externalApi',exteranlApi)

export default router;