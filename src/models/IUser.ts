import { InputName } from '../constants/constants'

interface IEditUserProfileGeneralParams {
  [InputName.firstName]: string,
  [InputName.secondName]: string,
  [InputName.displayName]: string,
}
export interface IEditUserProfileForumParams extends Partial<IEditUserProfileGeneralParams> {
  id: number;
  score?: number;
  theme?: string;
}

export interface IEditUserProfileParams extends IEditUserProfileGeneralParams {
  [InputName.login]: string;
  [InputName.email]: string;
  [InputName.phone]: string;
}

export interface IEditUserProfileParamsResponse extends IEditUserProfileParams {
  id: number;
  avatar: string;
}
