import { InputName } from '../constants/constants';

export interface ISignInParams {
  [InputName.login]: string;
  [InputName.password]: string;
}
