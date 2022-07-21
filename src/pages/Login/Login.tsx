import React, { lazy, useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Checkbox, FormControlLabel, Grid, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import { LoadingButton } from '@mui/lab';
import {
  useFetchSignInMutation,
  useFetchSignInOauthMutation,
  useFetchServiceIdQuery
} from '../../services/AuthServices';
import { ISignInParams } from '../../models/ISignInParams';
import schemaLogin from './schema';
import logoYandex from '../../assets/yandex.svg'

import '../../styles/auth.scss';

import {
  InputLabel,
  InputName,
  InputType,
  RouterLinks,
  RouterLinksName,
  ENDPOINTS
} from '../../constants/constants';

const TextField = lazy(() => import(/* webpackChunkName: "TextField" */ '../../components/TextField/TextField'));

const Login = () => {
  const methods = useForm<ISignInParams>({
    mode: 'onBlur',
    resolver: yupResolver(schemaLogin)
  });

  const navigate = useNavigate();

  const [fetchLogin, { isLoading, data, isSuccess }] = useFetchSignInMutation();
  const [fetchLoginOauth, { data: token }] = useFetchSignInOauthMutation();
  const { data: serviceId } = useFetchServiceIdQuery(process.env.REDIRECT_URI ?? '')

  const [passwordShown, setPasswordShown] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      navigate(RouterLinks.HOME);
    }
  }, [data])

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code')
    console.log('----this is login code=', code)
    if (code) {
      if (!token) {
        fetchLoginOauth({ code, redirect_uri: process.env.REDIRECT_URI ?? '' })
      } else {
        console.log('--WE HAVE TOKEN--token=', token)
      }
    }
  }, [token])

  const togglePasswordVisiblity = useCallback(() => {
    setPasswordShown(!passwordShown);
  }, [passwordShown])

  const goToOathPage = () => {
    // ...
    const sId = serviceId?.service_id

    if (sId) {
      const url = `${ENDPOINTS.OAUTH}/authorize?response_type=code&client_id=${sId}&redirect_uri=${process.env.REDIRECT_URI}`
      window.location.replace(url)
    }
  }

  const onSubmit = useCallback((value: ISignInParams) => fetchLogin(value), []);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className='form'>
        <Grid
          container
          spacing={0}
          direction='column'
          alignItems='center'
          justifyContent='center'
          className='layout'
        >
          <Grid item xs={12} className='input'>
            <TextField
              type={InputType.text}
              name={InputName.login}
              label={InputLabel.login}
              autoFocus
            />
          </Grid>

          <Grid item xs={12} className='input'>
            <TextField
              type={passwordShown ? '' : InputType.password}
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
                    onClick={togglePasswordVisiblity}
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
            <LoadingButton
              size='small'
              type='submit'
              loading={isLoading}
              variant='outlined'
            >
              Войти
            </LoadingButton>
          </Grid>

          <Typography
            variant='caption'
            display='block'
            sx={{
              my: 2,
              color: '#9e9e9e'
            }}
          >
            или войти с помощью
          </Typography>

          <Grid item xs={12}>
            <Button
              sx={{
                backgroundImage: `url(${logoYandex})`,
                backgroundRepeat: 'no-repeat',
                height: '20px'
              }}
              onClick={goToOathPage}
            />
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  )
}

export default Login
