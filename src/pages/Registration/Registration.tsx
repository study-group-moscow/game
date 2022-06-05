import React, { lazy } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import styles from './registration.module.scss';
import { InputLabel, InputName } from '../../utils/consts';

const TextField = lazy(() => import(/* webpackChunkName: "TextField" */ '../../components/TextField/TextField'))

const schema = yup.object()
  .shape({
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

type FormData = {
  [InputName.firstName]: string;
  [InputName.secondName]: string;
  [InputName.login]: string;
  [InputName.email]: string;
  [InputName.password]: string;
  [InputName.phone]: string;
};

const Registration:React.FC = () => {
  const methods = useForm<FormData>({
    defaultValues: {
      [InputName.firstName]: '',
      [InputName.secondName]: '',
      [InputName.login]: '',
      [InputName.email]: '',
      [InputName.password]: '',
      [InputName.phone]: ''
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: FormData) => console.log(data);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.form}>
        <Grid
          container
          spacing={0}
          direction='column'
          alignItems='center'
          justifyContent='center'
          className={styles.layout}
        >
          <Grid item xs={12} className={styles.input}>
            <TextField name={InputName.displayName} label={InputLabel.displayName} autoFocus />
          </Grid>

          <Grid item xs={12} className={styles.input}>
            <TextField name={InputName.firstName} label={InputLabel.firstName} />
          </Grid>

          <Grid item xs={12} className={styles.input}>
            <TextField name={InputName.secondName} label={InputLabel.secondName} />
          </Grid>

          <Grid item xs={12} className={styles.input}>
            <TextField name={InputName.login} label={InputLabel.login} />
          </Grid>

          <Grid item xs={12} className={styles.input}>
            <TextField name={InputName.email} label={InputLabel.email} />
          </Grid>

          <Grid item xs={12} className={styles.input}>
            <TextField name={InputName.phone} label={InputLabel.phone} />
          </Grid>

          <Grid item xs={12} className={styles.input}>
            <TextField name={InputName.password} label={InputLabel.password} />
          </Grid>

          <Grid item xs={12}>
            <Button variant='contained' color='success' type='submit' disableElevation>
              Регистрация
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  )
}

export default Registration
