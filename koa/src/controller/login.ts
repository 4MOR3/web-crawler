import Koa from 'koa'
import  Api from '../Api'
async function login(ctx: Koa.Context<Api.LoginApi>, next: Koa.Next) {
  const key = ctx.query.password;
  const dueTime = new Date();
  dueTime.setDate(dueTime.getDate() + 7)
  if (verify(key)) {
    ctx.body = {
      code: Api.Code.success,
      message: 'Verify Success!', 
      data: {
        token: '0',
        dueTime: dueTime
      }
    }
  } else { 
    ctx.body = {
      code: Api.Code.fail,
      message: 'Verify failed, maybe check if the password is right',
      data: {
        token: '',
        dueTime: new Date()
      }
    }
  }
  
  
  await next();
}
function verify(password: string | string[] | undefined): boolean {
  if (password === '990121') return true;
  else return false
}
export default login