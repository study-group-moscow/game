import React, { lazy, useCallback, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Checkbox, FormControlLabel, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useFetchSigUpMutation } from '../../services/AuthServices';
import { useAppDispatch } from '../../hooks/redux';
import { ISignUpParams } from '../../models/ISignUpParams';
import useShowError from '../../hooks/useShowError';
import { schemaRegistration } from './schema';
import {
  InputLabel,
  InputName,
  InputType,
  RouterLinks,
  RouterLinksName
} from '../../constants/constants';

import '../../styles/auth.scss';

import useToggleVisibility from '../../hooks/useToggleVisibility';

const TextField = lazy(() => import(/* webpackChunkName: "TextField" */ '../../components/TextField/TextField'))
const Loader = lazy(() => import(/* webpackChunkName: "TextField" */ '../../components/Loader/Loader'))

const Registration:React.FC = () => {
  const methods = useForm<ISignUpParams>({
    defaultValues: {
      [InputName.displayName]: '',
      [InputName.firstName]: '',
      [InputName.secondName]: '',
      [InputName.login]: '',
      [InputName.email]: '',
      [InputName.password]: '',
      [InputName.phone]: ''
    },
    mode: 'onBlur',
    resolver: yupResolver(schemaRegistration)
  });

  const { isToggleVisibility, setToggleVisibility } = useToggleVisibility(false);
  const [fetchSigUp, { isLoading, isSuccess, data, error, isError }] = useFetchSigUpMutation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = useCallback((value: ISignUpParams) => fetchSigUp(value), [])

  useEffect(() => {
    if (isSuccess) {
      navigate(RouterLinks.HOME)
    }
  }, [data])

  useShowError({ isError, error, dispatch })

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
              name={InputName.displayName}
              label={InputLabel.displayName}
              autoFocus
            />
          </Grid>

          <Grid item xs={12} className='input'>
            <TextField
              type={InputType.text}
              name={InputName.firstName}
              label={InputLabel.firstName}
            />
          </Grid>

          <Grid item xs={12} className='input'>
            <TextField
              type={InputType.text}
              name={InputName.secondName}
              label={InputLabel.secondName}
            />
          </Grid>

          <Grid item xs={12} className='input'>
            <TextField
              type={InputType.text}
              name={InputName.login}
              label={InputLabel.login}
            />
          </Grid>

          <Grid item xs={12} className='input'>
            <TextField
              type={InputType.email}
              name={InputName.email}
              label={InputLabel.email}
            />
          </Grid>

          <Grid item xs={12} className='input'>
            <TextField
              type={InputType.text}
              name={InputName.phone}
              label={InputLabel.phone}
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
            <Button
              variant='contained'
              color='success'
              type='submit'
              disableElevation
              disabled={isLoading}
            >
              Регистрация
            </Button>
          </Grid>
        </Grid>
      </form>

    </FormProvider>
  )
}

export default Registration
