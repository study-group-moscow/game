import React, { useCallback, useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Checkbox, FormControlLabel, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { LoadingButton } from '@mui/lab';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useFetchSignUpMutation } from '../../services/AuthServices';
import { ISignUpParams } from '../../models/ISignUpParams';
import schemaRegistration from './schema';
import {
  InputLabel,
  InputName,
  InputType,
  RouterLinks,
  RouterLinksName
} from '../../constants/constants';

import '../../styles/auth.scss';

import TxtField from '../../components/TextField/TextField'

const Registration:React.FC = () => {
  const methods = useForm<ISignUpParams>({
    mode: 'onBlur',
    resolver: yupResolver(schemaRegistration)
  });

  const [passwordShown, setPasswordShown] = useState(false);
  const [fetchSignUp, { isLoading, isSuccess, data }] = useFetchSignUpMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate(RouterLinks.HOME);
    }
  }, [data])

  const onSubmit = useCallback((value: ISignUpParams) => fetchSignUp(value), [])
  const togglePasswordVisiblity = useCallback(() => {
    setPasswordShown(!passwordShown);
  }, [passwordShown])

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
            <TxtField
              type={InputType.text}
              name={InputName.displayName}
              label={InputLabel.displayName}
            />
          </Grid>

          <Grid item xs={12} className='input'>
            <TxtField
              type={InputType.text}
              name={InputName.firstName}
              label={InputLabel.firstName}
            />
          </Grid>

          <Grid item xs={12} className='input'>
            <TxtField
              type={InputType.text}
              name={InputName.secondName}
              label={InputLabel.secondName}
            />
          </Grid>

          <Grid item xs={12} className='input'>
            <TxtField
              type={InputType.text}
              name={InputName.login}
              label={InputLabel.login}
            />
          </Grid>

          <Grid item xs={12} className='input'>
            <TxtField
              type={InputType.email}
              name={InputName.email}
              label={InputLabel.email}
            />
          </Grid>

          <Grid item xs={12} className='input'>
            <TxtField
              type={InputType.text}
              name={InputName.phone}
              label={InputLabel.phone}
            />
          </Grid>

          <Grid item xs={12} className='input'>
            <TxtField
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
                onClick={() => navigate(RouterLinks.LOGIN)}
                disableFocusRipple
                disableRipple
                style={{ textTransform: 'none' }}
                variant='text'
                color='primary'
              >
                {RouterLinksName.ALREADY_REGISTRATION}
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
              Регистрация
            </LoadingButton>
          </Grid>
        </Grid>
      </form>

    </FormProvider>
  )
}

export default Registration
