import { InputName } from '../utils/consts';

export interface ISigInParams {
  [InputName.login]: string;
  [InputName.password]: string;
}
