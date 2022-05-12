import axios from 'axios';
import { baseUrl } from '@apis/consts';
import { ResultHomeMeta } from '@apis/types/ResultHomeMeta';
export class HomeApi {
  /** 获取用户初始化信息 */
  public getInitalInfo(): Promise<ResultHomeMeta> {
    const path = '/home/me';
    const url = baseUrl + path;
    console.log('URL: ', url);
    return new Promise((resolve, reject) => {
      axios.get(url).then(res => {
        resolve({
          code: 0,
          result: res.data?.result,
        });
      });
    });
  }
}

export default new HomeApi();
