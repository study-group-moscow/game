import { InputName } from '../constants/constants';

export interface ISignInParams {
  [InputName.login]: string;
  [InputName.password]: string;
}

export interface ISignInParamsOauth {
  code: string
  redirect_uri: string
}

export type ISignInResponseOauth = { reason?: string } | string
