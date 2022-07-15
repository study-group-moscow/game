import React, { lazy, useCallback } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEditProfileMutation } from '../../services/UserService';
import { useFetchUserQuery } from '../../services/AuthServices';
import { useAppDispatch } from '../../hooks/redux';
import { IEditUserProfileParams, IEditUserProfileParamsResponse } from '../../models/IUser';
import { IAlertTypeProps, showAlert } from '../../store/reducers/AlertSlice'
import schema from './schema';
import {
  InputLabel,
  InputName,
  InputType,
  TYPES_ALERT,
  MESSAGES_TEXT
} from '../../constants/constants';

import '../../styles/auth.scss';

const TextField = lazy(() => import(/* webpackChunkName: "TextField" */ '../../components/TextField/TextField'));

const Profile = () => {
  const { data: user, isFetching, isSuccess } = useFetchUserQuery()
  const [editProfile] = useEditProfileMutation();
  const dispatch = useAppDispatch();

  const methods = useForm<IEditUserProfileParamsResponse>({
    defaultValues: {
      [InputName.displayName]: user?.display_name,
      [InputName.firstName]: user?.first_name,
      [InputName.secondName]: user?.second_name,
      [InputName.login]: user?.login,
      [InputName.email]: user?.email,
      [InputName.phone]: user?.phone
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const onSubmit = useCallback(async (value: IEditUserProfileParams) => {
    await editProfile(value)
    if (isSuccess) {
      dispatch(showAlert({
        text: MESSAGES_TEXT.SUCCESS,
        type: TYPES_ALERT.SUCCESS as IAlertTypeProps
      }))
    }
  }, [])

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
              name={InputName.displayName}
              label={InputLabel.displayName}
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

          <Grid item xs={12}>
            <LoadingButton
              size='small'
              type='submit'
              loading={isFetching}
              variant='outlined'
            >
              Сохранить
            </LoadingButton>
          </Grid>
        </Grid>
      </form>

    </FormProvider>
  )
}

export default Profile

