import axios from 'axios';
import { baseUrl } from '@apis/consts';
import { ResultHomeMeta } from '@apis/types/ResultHomeMeta';

export interface ParamsGetInitalInfo {
  /**
   * @description 用户id
   */
  uid: string;
}

export class HomeApi {
  /** 获取用户初始化信息 */
  public getInitalInfo(params: ParamsGetInitalInfo): Promise<ResultHomeMeta> {
    const path = '/home/me';
    const url = baseUrl + path;
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

export default new HomeApi();
