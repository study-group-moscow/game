import { InputName } from '../utils/consts';

export interface ISigUpParams {
  [InputName.displayName]: string;
  [InputName.firstName]: string;
  [InputName.secondName]: string;
  [InputName.login]: string;
  [InputName.email]: string;
  [InputName.password]: string;
  [InputName.phone]: string;
}
