import React, { lazy, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Checkbox, FormControlLabel, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import styles from './login.module.scss';
import {
  InputLabel,
  InputName,
  MESSAGES_TEXT,
  RouterLinks,
  RouterLinksName,
  TYPES_ALERT
} from '../../utils/consts';
import { useFetchSigInMutation } from '../../services/AuthServices';
import { IErrorResponse } from '../../models/IErrorResponse';
import { ISigInParams } from '../../models/ISigInParams';
import { IAlertTypeProps, showAlert } from '../../store/reducers/AlertSlice';

const TextField = lazy(() => import(/* webpackChunkName: "TextField" */ '../../components/TextField/TextField'))
const Loader = lazy(() => import(/* webpackChunkName: "Loader" */ '../../components/Loader/Loader'))

const schema = yup.object()
  .shape({
    password: yup.string()
      .required('Пароль не указан.')
      .min(8, 'Пароль может содержать только латинские буквы.')
      .matches(/[a-zA-Z]/, 'Пароль может содержать только латинские буквы.'),
    login: yup.string()
      .required('Логин не указан.')
  })

const Login = () => {
  const methods = useForm<ISigInParams>({
    defaultValues: {
      [InputName.login]: 'Test0010',
      [InputName.password]: 'Abrikosov8436259'
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const [fetchLogin, {
    isLoading,
    data,
    error,
    isSuccess,
    isError
  }] = useFetchSigInMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState(false);

  const onSubmit = (value: ISigInParams) => fetchLogin(value)

  useEffect(() => {
    if (isSuccess) {
      navigate(RouterLinks.HOME)
    }
  }, [data])

  useEffect(() => {
    if (isError) {
      const err = ((error) as IErrorResponse);
      dispatch(showAlert({
        text: err?.data?.reason ?? MESSAGES_TEXT.ERROR_OCCURRED,
        type: TYPES_ALERT.ERROR as IAlertTypeProps
      }));
    }
  }, [error])

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.form}>
        {
          isLoading && <Loader />
        }
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
            <TextField
              type={isShowPassword ? '' : InputName.password}
              name={InputName.password}
              label={InputLabel.password}
            />
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
              <Button
                onClick={() => navigate(RouterLinks.REGISTRATION)}
                disableFocusRipple
                disableRipple
                style={{ textTransform: 'none' }}
                variant='text'
                color='primary'
              >
                {RouterLinksName.NOT_REGISTRATION}
              </Button>
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
