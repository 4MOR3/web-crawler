namespace Api { 

  export const enum Code {
    success = 0,
    fail = 1,
    otherError = 2
  }
  
  export type BaseApi = {
    code: Code,
    message: string,
  }
  
  //login
  export interface LoginApi extends BaseApi { 
    data: {
      token: string,
      dueTime: Date,
    }
  }
  export interface StaticWebApi extends BaseApi { 
    data: {
      text: string
    }
  }
 }
export default Api
