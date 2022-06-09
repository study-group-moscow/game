import React, { lazy } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import styles from './login.module.scss';
import { InputLabel, InputName } from '../../utils/consts';
import { useFetchSigInMutation, useFetchUserMutation } from '../../services/AuthServices';

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

export type TLoginParam = {
  [InputName.login]: string;
  [InputName.password]: string;
};

const Login = () => {
  const methods = useForm<TLoginParam>({
    defaultValues: {
      [InputName.login]: 'Test0010',
      [InputName.password]: 'Abrikosov8436259'
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const [fetchLogin] = useFetchSigInMutation();
  const [fetchUser] = useFetchUserMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: TLoginParam) => {
    await fetchLogin(data);
    await fetchUser('');
    navigate('/home')
  }

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
            <TextField name={InputName.login} label={InputLabel.login} autoFocus />
          </Grid>

          <Grid item xs={12} className={styles.input}>
            <TextField name={InputName.password} label={InputLabel.password} />
          </Grid>

          <Grid item xs={12}>
            <Button variant='contained' color='success' type='submit' disableElevation>
              Войти
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  )
}

export default Login
