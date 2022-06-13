import React, { lazy, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Checkbox, FormControlLabel, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import styles from './login.module.scss';
import { InputLabel, InputName, RouterLinks, RouterLinksName, TYPES_ALERT } from '../../utils/consts';
import { useFetchSigInMutation, useFetchUserMutation } from '../../services/AuthServices';
import { setCredentials } from '../../store/reducers/AuthSlice';
import { IUserResponse } from '../../models/IUserResponse';
import { IErrorResponse } from '../../models/IErrorResponse';
import { IAlertTypeProps, showAlert } from '../../store/reducers/AlertSlice';

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

export interface ISigInParam {
  [InputName.login]: string;
  [InputName.password]: string;
}

const Login = () => {
  const methods = useForm<ISigInParam>({
    defaultValues: {
      [InputName.login]: 'Test0010',
      [InputName.password]: 'Abrikosov8436259'
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const [fetchLogin] = useFetchSigInMutation();
  const [fetchUser] = useFetchUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUser = async () => {
    const user: IUserResponse = await fetchUser('').unwrap();
    dispatch(setCredentials(user));
    navigate(RouterLinks.HOME);
  }

  const onSubmit = async (value: ISigInParam) => {
    await fetchLogin(value).then((response) => {
      const { error, data } = (response as IErrorResponse);
      if (data) {
        getUser();
      } else if (error) {
        const type: string = TYPES_ALERT.ERROR;
        dispatch(showAlert({
          text: error?.data?.reason ?? '',
          type: type as IAlertTypeProps
        }));
      }
    });
  }

  const [isShowPassword, setIsShowPassword] = useState(false);

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
            <TextField type={isShowPassword ? '' : InputName.password} name={InputName.password} label={InputLabel.password} />
          </Grid>

          <Grid
            container
            alignItems='center'
            justifyContent='center'
          >
            <Grid item>
              <FormControlLabel
                control={(
                  <Checkbox
                    color='primary'
                    onClick={() => setIsShowPassword((pre) => !pre)}
                  />
                )}
                label={InputLabel.showPassword}
              />
            </Grid>
            <Grid item>
              <Button onClick={() => navigate(RouterLinks.REGISTRATION)} disableFocusRipple disableRipple style={{ textTransform: 'none' }} variant='text' color='primary'>{RouterLinksName.NOT_REGISTRATION}</Button>
            </Grid>
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
