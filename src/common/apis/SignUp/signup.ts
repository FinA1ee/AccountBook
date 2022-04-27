import { ResultBoolean } from '@apis/types';
import axios, { AxiosPromise, AxiosResponse } from 'axios';

const baseUrl = 'http://localhost:3000';

export interface ParamsAddNewUser {
  /**
   * @description 用户名
   */
  username: string;
  /**
   * @description hash密码
   */
  password: string;
  /**
   * @description 邮箱
   */
  email: string;
}

export class SignUpApi {
  /** 新用户注册 */
  public addNewUser(params: ParamsAddNewUser) {
    console.log('params123123: ', params);
    const path = '/api/signup/add_new_user';
    const url = baseUrl + path;
    axios({
      data: params,
      method: 'post',
      url: url,
    }).then(res => {
      console.log('axios res: ', res);
    });
  }
}

export default new SignUpApi();
