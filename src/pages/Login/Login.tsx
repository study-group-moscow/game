import React, { lazy } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Container, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import styles from './login.module.scss';
import { InputLabel, InputName } from '../../utils/consts';

const TextField = lazy(() => import(/* webpackChunkName: "TextField" */ '../../components/TextField/TextField'))

const schema = yup.object()
  .shape({
    password: yup.string()
      .required('Пароль не указан.')
      .min(8, 'Пароль может содержать только латинские буквы.')
      .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    login: yup.string()
      .required('Логин не указан.')
  })

type FormData = {
  [InputName.login]: string;
  [InputName.password]: string;
};

const Login = () => {
  const methods = useForm<FormData>({
    defaultValues: {
      [InputName.login]: '',
      [InputName.password]: ''
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });
  const onSubmit = (data: any) => console.log(data);

  return (
    <FormProvider {...methods}>
      <Container style={{ width: '100%', height: '100%' }}>
        <form className={styles.Login} onSubmit={methods.handleSubmit(onSubmit)}>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name={InputName.login}
                label={InputLabel.login}
                autoFocus={true}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name={InputName.password}
                label={InputLabel.password}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant='contained'
                color='success'
                type='submit'
              >
                Войти
              </Button>
            </Grid>
          </Grid>

        </form>
      </Container>
    </FormProvider>
  );
}

export default Login;
