import React, { lazy, useCallback, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Checkbox, FormControlLabel, Grid } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import { useFetchSigInMutation } from '../../services/AuthServices';
import { IErrorResponse } from '../../models/IErrorResponse';
import { ISignInParams } from '../../models/ISignInParams';
import { schemaLogin } from './schema';

import './Login.scss';

import {
  InputLabel,
  InputName, InputType,
  MESSAGES_TEXT,
  RouterLinks,
  RouterLinksName,
  TYPES_ALERT
} from '../../constants/constants';

import { IAlertTypeProps, showAlert } from '../../store/reducers/AlertSlice';
import useToggleVisibility from '../../hooks/useToggleVisibility';

const TextField = lazy(() => import(/* webpackChunkName: "TextField" */ '../../components/TextField/TextField'))
const Loader = lazy(() => import(/* webpackChunkName: "Loader" */ '../../components/Loader/Loader'))

const Login = () => {
  const methods = useForm<ISignInParams>({
    defaultValues: {
      [InputName.login]: 'test911',
      [InputName.password]: 'Abrikosov8436259'
    },
    mode: 'onBlur',
    resolver: yupResolver(schemaLogin)
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
  const { isToggleVisibility, setToggleVisibility } = useToggleVisibility(false);

  const onSubmit = useCallback((value: ISignInParams) => {
    console.log(value)
    fetchLogin(value)
  }, []);

  useEffect(() => {
    if (isSuccess) {
      navigate(RouterLinks.HOME);
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
      <form onSubmit={methods.handleSubmit(onSubmit)} className='Form'>
        {
          isLoading && <Loader />
        }
        <Grid
          container
          spacing={0}
          direction='column'
          alignItems='center'
          justifyContent='center'
          className='Layout'
        >
          <Grid item xs={12} className='Input'>
            <TextField
              type={InputType.text}
              name={InputName.login}
              label={InputLabel.login}
              autoFocus
            />
          </Grid>

          <Grid item xs={12} className='Input'>
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
