import React, { lazy, useCallback, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Checkbox, FormControlLabel, Grid } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import { useFetchSigInMutation } from '../../services/AuthServices';
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

import useToggleVisibility from '../../hooks/useToggleVisibility';

const TextField = lazy(() => import(/* webpackChunkName: "TextField" */ '../../components/TextField/TextField'))
const Loader = lazy(() => import(/* webpackChunkName: "Loader" */ '../../components/Loader/Loader'))

const Login = () => {
  const methods = useForm<ISignInParams>({
    defaultValues: {
      [InputName.login]: '',
      [InputName.password]: ''
    },
    mode: 'onBlur',
    resolver: yupResolver(schemaLogin)
  });

  const [fetchLogin, { isLoading, data, isSuccess }] = useFetchSigInMutation();

  const navigate = useNavigate();
  const { isToggleVisibility, setToggleVisibility } = useToggleVisibility(false);

  const onSubmit = useCallback((value: ISignInParams) => fetchLogin(value), []);

  useEffect(() => {
    if (isSuccess) {
      navigate(RouterLinks.HOME);
    }
  }, [data])

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className='form'>
        {
          isLoading && <Loader />
        }
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
              type={isToggleVisibility ? '' : InputType.password}
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
                    onClick={setToggleVisibility}
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
            <Button
              variant='contained'
              color='success'
              type='submit'
              disableElevation
              disabled={isLoading}
            >
              Войти
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  )
}

export default Login
