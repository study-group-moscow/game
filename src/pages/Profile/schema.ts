import * as yup from 'yup';

export default yup.object().shape({
  display_name: yup.string()
    .required('Никнейм не указан.'),
  first_name: yup.string()
    .required('Имя не указано.'),
  second_name: yup.string()
    .required('Фамилия не указана.'),
  email: yup
    .string()
    .email('Неверный формат электронной почты.')
    .required('Требуется почта.'),
  login: yup.string()
    .required('Логин не указан.')
})
