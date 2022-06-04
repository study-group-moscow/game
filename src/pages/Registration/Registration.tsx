import React, { lazy } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Container, Grid, Paper } from '@mui/material';
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

const Registration = () => {
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

  const onSubmit = (data: any) => console.log(data);

  return (
    <Paper style={{ margin: '5px' }}>
      <div style={{ padding: '30px' }}>
        <FormProvider {...methods}>
          <Container>
            <form className={styles.Registration} onSubmit={methods.handleSubmit(onSubmit)}>

              <Grid container spacing={2} justifyContent='center'>
                <Grid item xs={12}>
                  <TextField
                    name={InputName.displayName}
                    label={InputLabel.displayName}
                    autoFocus={true}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name={InputName.firstName}
                    label={InputLabel.firstName}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name={InputName.secondName}
                    label={InputLabel.secondName}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name={InputName.login}
                    label={InputLabel.login}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name={InputName.email}
                    label={InputLabel.email}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name={InputName.phone}
                    label={InputLabel.phone}
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
                    Регистрировать
                  </Button>
                </Grid>
              </Grid>

            </form>
          </Container>
        </FormProvider>
      </div>
    </Paper>
  );
}

export default Registration;
