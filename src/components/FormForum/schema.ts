import * as yup from 'yup';
import { InputName } from '../../constants/constants';

export default yup.object().shape({
  [InputName.message]: yup.string()
    .max(255, 'Максимальное количество символов должно не превышать 255')
})
