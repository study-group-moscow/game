import React, { lazy, useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Checkbox, FormControlLabel, Grid } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import { LoadingButton } from '@mui/lab';
import { useFetchSignInMutation } from '../../services/AuthServices';
import { ISignInParams } from '../../models/ISignInParams';
import { schemaLogin } from './schema';

import '../../styles/auth.scss';

import {
  InputLabel,
  InputName,
  InputType,
  RouterLinks,
  RouterLinksName
} from '../../constants/constants';


const TextField = lazy(() => import(/* webpackChunkName: "TextField" */ '../../components/TextField/TextField'));

const Login = () => {
  const methods = useForm<ISignInParams>({
    defaultValues: {
      [InputName.login]: '',
      [InputName.password]: ''
    },
    mode: 'onBlur',
    resolver: yupResolver(schemaLogin)
  });

  const navigate = useNavigate();

  const [fetchLogin, { isLoading, data, isSuccess }] = useFetchSignInMutation();
  const [passwordShown, setPasswordShown] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      navigate(RouterLinks.HOME);
    }
  }, [data])

  const togglePasswordVisiblity = useCallback(() => {
    setPasswordShown(!passwordShown);
  }, [passwordShown])

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
              disabled={isLoading}
              variant='outlined'
            >
              Войти
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  )
}

export default Login
