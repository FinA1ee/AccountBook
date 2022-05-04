import { ResultBoolean } from '@apis/types';
import axios, { AxiosPromise, AxiosResponse } from 'axios';

const baseUrl = process.env.HOST;
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

export interface ParamsCheckUsername {
  /**
   * @description 用户名
   */
  username: string;
}

export interface ParamsCheckEmail {
  /**
   * @description 邮箱
   */
  email: string;
}

export class SignUpApi {
  /** 新用户注册 */
  public addNewUser(params: ParamsAddNewUser): Promise<ResultBoolean> {
    const path = '/api/signup/add_new_user';
    const url = baseUrl + path;
    return new Promise((resolve, reject) => {
      axios.post(url, params).then(res => {
        resolve({
          code: 0,
          result: res.data?.result,
        });
      });
    });
  }

  /** 检查已注册用户名 */
  public checkUsername(params: ParamsCheckUsername): Promise<ResultBoolean> {
    const path = '/api/signup/check_username';
    const url = baseUrl + path;
    return new Promise((resolve, reject) => {
      axios
        .get(url, {
          params,
        })
        .then(res => {
          resolve({
            code: 0,
            result: res.data?.result,
          });
        });
    });
  }

  /** 检查已注册用户名 */
  public checkEmail(params: ParamsCheckEmail): Promise<ResultBoolean> {
    const path = '/api/signup/check_email';
    const url = baseUrl + path;
    return new Promise((resolve, reject) => {
      axios
        .get(url, {
          params,
        })
        .then(res => {
          if (res.data.code !== 0) {
            reject({
              code: 1,
            });
          } else {
            resolve({
              code: 0,
              result: res.data?.result,
            });
          }
        });
    });
  }
}

export default new SignUpApi();
