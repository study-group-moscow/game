import * as yup from 'yup';
import userProfileSchema from '../Profile/schema'

export default userProfileSchema.shape({
  password: yup.string()
    .required('Пароль не указан.')
    .min(8, 'Пароль может содержать только латинские буквы.')
    .matches(/[a-zA-Z]/, 'Пароль может содержать только латинские буквы.')
})

