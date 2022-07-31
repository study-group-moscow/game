import * as yup from 'yup';

export default yup.object().shape({
  message: yup.string()
    .required('Пароль не указан.')
    .min(8, 'Пароль может содержать только латинские буквы.')
})
