import axios from 'axios';
import { baseUrl } from '@apis/consts';
import { ResultBoolean } from '@apis/types/ResultBoolean';

export interface ParamsLoginUser {
  /**
   * @description 用户名
   */
  username: string;
  /**
   * @description 密码
   */
  password: string;
}

export class LoginApi {
  /** 用户登录 */
  public loginUser(params: ParamsLoginUser): Promise<ResultBoolean> {
    const path = '/login/password';
    const url = baseUrl + path;
    console.log('url: ', url, params);
    return new Promise((resolve, reject) => {
      axios.get(url, { params }).then(res => {
        resolve({
          code: 0,
          result: res.data?.result,
        });
      });
    });
  }
}

export default new LoginApi();
