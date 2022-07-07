import * as yup from 'yup';

export const schemaLogin = yup.object().shape({
  password: yup.string()
    .required('Пароль не указан.')
    .min(8, 'Пароль может содержать только латинские буквы.')
    .matches(/[a-zA-Z]/, 'Пароль может содержать только латинские буквы.'),
  login: yup.string()
    .required('Логин не указан.')
})
