import React, { lazy, useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Checkbox, FormControlLabel, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import './Registration.scss';
import {
  InputLabel,
  InputName,
  MESSAGES_TEXT,
  RouterLinks,
  RouterLinksName,
  TYPES_ALERT
} from '../../utils/consts';
import { useFetchSigUpMutation } from '../../services/AuthServices';
import { useAppDispatch } from '../../hooks/redux';
import { IAlertTypeProps, showAlert } from '../../store/reducers/AlertSlice';
import { ISigUpParams } from '../../models/ISigUpParams';
import { IErrorResponse } from '../../models/IErrorResponse';

const TextField = lazy(() => import(/* webpackChunkName: "TextField" */ '../../components/TextField/TextField'))
const Loader = lazy(() => import(/* webpackChunkName: "TextField" */ '../../components/Loader/Loader'))

const schema = yup.object()
  .shape({
    first_name: yup.string()
      .required('Имя не указано.'),
    second_name: yup.string()
      .required('Фамилия не указана.'),
    display_name: yup.string()
      .required('Логин не указан.'),
    email: yup
      .string()
      .email('Неверный формат электронной почты.')
      .required('Требуется почта.'),
    password: yup.string()
      .required('Пароль не указан.')
      .min(8, 'Пароль может содержать только латинские буквы.')
      .matches(/[a-zA-Z]/, 'Пароль может содержать только латинские буквы.'),
    login: yup.string()
      .required('Логин не указан.')
  })

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
    resolver: yupResolver(schema)
  });

  const [isShowPassword, setIsShowPassword] = useState(false);
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
            <TextField name={InputName.displayName} label={InputLabel.displayName} autoFocus />
          </Grid>

          <Grid item xs={12} className='Input'>
            <TextField name={InputName.firstName} label={InputLabel.firstName} />
          </Grid>

          <Grid item xs={12} className='Input'>
            <TextField name={InputName.secondName} label={InputLabel.secondName} />
          </Grid>

          <Grid item xs={12} className='Input'>
            <TextField name={InputName.login} label={InputLabel.login} />
          </Grid>

          <Grid item xs={12} className='Input'>
            <TextField name={InputName.email} label={InputLabel.email} />
          </Grid>

          <Grid item xs={12} className='Input'>
            <TextField name={InputName.phone} label={InputLabel.phone} />
          </Grid>

          <Grid item xs={12} className='Input'>
            <TextField type={isShowPassword ? '' : InputName.password} name={InputName.password} label={InputLabel.password} />
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
              <Button onClick={() => navigate(RouterLinks.LOGIN)} disableFocusRipple disableRipple style={{ textTransform: 'none' }} variant='text' color='primary'>{RouterLinksName.ALREADY_REGISTRATION}</Button>
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
