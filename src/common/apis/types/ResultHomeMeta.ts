import * as models from '..';

export interface ResultHomeMeta {
  code?: number;
  message?: string;
  ok?: boolean;
  result?: models.UserMetaVo;
}
