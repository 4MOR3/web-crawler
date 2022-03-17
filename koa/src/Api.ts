/// <reference types="node"/>
namespace Api { 

  export const enum Code {
    success = 0,
    fail = 1,
    otherError = 2
  }
  
  export type BaseApi = {
    code: Code,
    message: string,
    data: object,
  }
  
  //login
  export interface LoginApi extends BaseApi { 
    data: {
      token: string,
      dueTime: Date,
    }
  }
 }
export default Api
