import React, { useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Checkbox, FormControlLabel, Grid } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import { LoadingButton } from '@mui/lab';
import TextField from 'src/components/TextField/TextField';
import { useFetchSignInMutation } from '../../services/AuthServices';
import { ISignInParams } from '../../models/ISignInParams';
import { schemaLogin } from './schema';

import style from '../../styles/auth.module.scss';

import {
  InputLabel,
  InputName,
  InputType,
  RouterLinks,
  RouterLinksName
} from '../../constants/constants';

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
      <form onSubmit={methods.handleSubmit(onSubmit)} className={style.form}>
        <Grid
          container
          spacing={0}
          direction='column'
          alignItems='center'
          justifyContent='center'
          className={style.layout}
        >
          <Grid item xs={12} className={style.input}>
            <TextField
              type={InputType.text}
              name={InputName.login}
              label={InputLabel.login}
              autoFocus
            />
          </Grid>

          <Grid item xs={12} className={style.input}>
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
        </Grid>
      </form>
    </FormProvider>
  )
}

export default Login
