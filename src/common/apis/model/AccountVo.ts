import * as models from './models';

/**
 * @property `avatar` 账户头像
 * @property `regTime` 账号注册时间
 * @property `balance` 钱包余额
 */
export interface AccountInfoVo {
  avatar: String;
  regTime: String;
  balance: Number;
}
