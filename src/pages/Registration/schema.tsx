import * as yup from 'yup';

export const schemaRegistration = yup.object().shape({
  first_name: yup.string()
    .required('Имя не указано.'),
  second_name: yup.string()
    .required('Фамилия не указана.'),
  display_name: yup.string()
    .required('Логин не указан.'),
  email: yup
    .string()
    .email('Неверный формат электронной почты.')
    .required('Требуется почта.'),
  password: yup.string()
    .required('Пароль не указан.')
    .min(8, 'Пароль может содержать только латинские буквы.')
    .matches(/[a-zA-Z]/, 'Пароль может содержать только латинские буквы.'),
  login: yup.string()
    .required('Логин не указан.')
})
