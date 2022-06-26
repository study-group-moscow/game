import React, { lazy, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Checkbox, FormControlLabel, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import './Registration.scss';
import {
  InputLabel,
  InputName, InputType,
  MESSAGES_TEXT,
  RouterLinks,
  RouterLinksName,
  TYPES_ALERT
} from '../../constants/constants';
import { useFetchSigUpMutation } from '../../services/AuthServices';
import { useAppDispatch } from '../../hooks/redux';
import { IAlertTypeProps, showAlert } from '../../store/reducers/AlertSlice';
import { ISigUpParams } from '../../models/ISigUpParams';
import { IErrorResponse } from '../../models/IErrorResponse';
import useToggleVisibility from '../../hooks/useToggleVisibility';
import { schemaRegistration } from './schema';

const TextField = lazy(() => import(/* webpackChunkName: "TextField" */ '../../components/TextField/TextField'))
const Loader = lazy(() => import(/* webpackChunkName: "TextField" */ '../../components/Loader/Loader'))

const Registration:React.FC = () => {
  const methods = useForm<ISigUpParams>({
    defaultValues: {
      [InputName.displayName]: 'test',
      [InputName.firstName]: 'test',
      [InputName.secondName]: 'test',
      [InputName.login]: 'test00123',
      [InputName.email]: 'asd@mail.ru',
      [InputName.password]: 'Abrikosov8436259',
      [InputName.phone]: '9667772233'
    },
    mode: 'onBlur',
    resolver: yupResolver(schemaRegistration)
  });

  const { isToggleVisibility, setToggleVisibility } = useToggleVisibility(false);
  const [fetchSigUp, { isLoading, isSuccess, data, error, isError }] = useFetchSigUpMutation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (value: ISigUpParams) => fetchSigUp(value)

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
            <Button variant='contained' color='success' type='submit' disableElevation>
              Регистрация
            </Button>
          </Grid>
        </Grid>
      </form>

    </FormProvider>
  )
}

export default Registration
