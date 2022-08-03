import React, { lazy, useCallback, useEffect } from 'react';
import { skipToken } from '@reduxjs/toolkit/query'
import { useForm, FormProvider } from 'react-hook-form';
import { Grid, IconButton, Box, Avatar } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEditProfileMutation, useEditAvatarMutation } from '../../services/UserService';

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
  MESSAGES_TEXT,
  MENU_ITEMS,
  ENDPOINTS
} from '../../constants/constants';

import styles from '../../styles/centerContent.module.scss';
import '../../styles/auth.scss';
import { useUpdateUserMutation, useGetOneUserQuery } from '../../services/ForumService';

const TextField = lazy(() => import(/* webpackChunkName: "TextField" */ '../../components/TextField/TextField'));

const Profile = () => {
  const { data: user, isFetching, isSuccess } = useFetchUserQuery(undefined, { skip: false })
  const { data: userWithTheme } = useGetOneUserQuery(isSuccess ? user.id : skipToken);
  const [editProfile, { data: userEditData, isSuccess: isEditSuccess }] = useEditProfileMutation();
  const [editAvatar] = useEditAvatarMutation();
  const [updateUser] = useUpdateUserMutation();
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

  useEffect(() => {
    if (isEditSuccess) {
      if (userEditData && userWithTheme) {
        updateUser({
          id: userEditData.id,
          first_name: userEditData.first_name,
          second_name: userEditData.second_name,
          display_name: userEditData.display_name,
          theme: userWithTheme.theme,
          score: 0
        })
      }
    }
  }, [userEditData])

  const showSuccessToast = () => {
    if (isSuccess) {
      dispatch(showAlert({
        text: MESSAGES_TEXT.SUCCESS,
        type: TYPES_ALERT.SUCCESS as IAlertTypeProps
      }))
    }
  }

  const onSubmitFormData = useCallback(async (value: IEditUserProfileParams) => {
    await editProfile(value)
    showSuccessToast()
  }, [])

  const onSubmitAvatar = useCallback(async (evt: React.ChangeEvent<HTMLInputElement>) => {
    const payload = evt.target.files
    const image = payload && payload[0]
    const formData = new FormData();
    formData.append('avatar', image!);

    await editAvatar(formData)
    showSuccessToast()
  }, [])

  return (
    <div className={styles.center}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <IconButton
          color='primary'
          aria-label='upload picture'
          component='label'
          sx={{
            width: 140,
            alignSelf: 'center',
            marginBottom: 4
          }}
        >
          <input hidden accept='image/*' type='file' onChange={onSubmitAvatar} />

          <Avatar
            title={MENU_ITEMS.profile.title}
            sx={{ width: 120, height: 120 }}
            src={ENDPOINTS.RESOURCES + (user?.avatar ?? '')}
          />
        </IconButton>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmitFormData)} className='form'>
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
      </Box>
    </div>
  )
}

export default Profile

