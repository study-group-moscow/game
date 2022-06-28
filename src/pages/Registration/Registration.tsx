import React, { lazy, useCallback, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Checkbox, FormControlLabel, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { IAlertTypeProps, showAlert } from '../../store/reducers/AlertSlice';
import { useFetchSigUpMutation } from '../../services/AuthServices';
import { useAppDispatch } from '../../hooks/redux';
import { ISignUpParams } from '../../models/ISignUpParams';
import { IErrorResponse } from '../../models/IErrorResponse';
import { schemaRegistration } from './schema';
import {
  InputLabel,
  InputName, InputType,
  MESSAGES_TEXT,
  RouterLinks,
  RouterLinksName,
  TYPES_ALERT
} from '../../constants/constants';

import '../../styles/Auth.scss';

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
              name={InputName.displayName}
              label={InputLabel.displayName}
              autoFocus
            />
          </Grid>

          <Grid item xs={12} className='Input'>
            <TextField
              type={InputType.text}
              name={InputName.firstName}
              label={InputLabel.firstName}
            />
          </Grid>

          <Grid item xs={12} className='Input'>
            <TextField
              type={InputType.text}
              name={InputName.secondName}
              label={InputLabel.secondName}
            />
          </Grid>

          <Grid item xs={12} className='Input'>
            <TextField
              type={InputType.text}
              name={InputName.login}
              label={InputLabel.login}
            />
          </Grid>

          <Grid item xs={12} className='Input'>
            <TextField
              type={InputType.email}
              name={InputName.email}
              label={InputLabel.email}
            />
          </Grid>

          <Grid item xs={12} className='Input'>
            <TextField
              type={InputType.text}
              name={InputName.phone}
              label={InputLabel.phone}
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
