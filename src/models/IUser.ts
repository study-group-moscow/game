import { InputName } from '../constants/constants'

export interface IUser {
  id: number;
  name: string;
  email: string;
}

export interface IEditUserProfileParams {
  [InputName.firstName]: string,
  [InputName.secondName]: string,
  [InputName.displayName]: string,
  [InputName.login]: string;
  [InputName.email]: string;
  [InputName.phone]: string;
}

export interface IEditUserProfileParamsResponse extends IEditUserProfileParams {
  id: number;
  avatar: string;
}
