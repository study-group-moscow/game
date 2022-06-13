import React, { lazy, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Checkbox, FormControlLabel, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import styles from './registration.module.scss';
import { InputLabel, InputName, RouterLinks, RouterLinksName, TYPES_ALERT } from '../../utils/consts';
import { useFetchSigUpMutation, useFetchUserMutation } from '../../services/AuthServices';
import { useAppDispatch } from '../../hooks/redux';
import { IAlertTypeProps, showAlert } from '../../store/reducers/AlertSlice';
import { IErrorResponse } from '../../models/IErrorResponse';
import { IUserResponse } from '../../models/IUserResponse';
import { setCredentials } from '../../store/reducers/AuthSlice';

const TextField = lazy(() => import(/* webpackChunkName: "TextField" */ '../../components/TextField/TextField'))

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

export interface ISigUpParam {
  [InputName.displayName]: string;
  [InputName.firstName]: string;
  [InputName.secondName]: string;
  [InputName.login]: string;
  [InputName.email]: string;
  [InputName.password]: string;
  [InputName.phone]: string;
}

const Registration:React.FC = () => {
  const methods = useForm<ISigUpParam>({
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
    resolver: yupResolver(schema)
  });

  const [isShowPassword, setIsShowPassword] = useState(false);

  const [fetchSigUp] = useFetchSigUpMutation();
  const [fetchUser] = useFetchUserMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getUser = async () => {
    const user: IUserResponse = await fetchUser('').unwrap();
    dispatch(setCredentials(user));
  }

  const onSubmit = async (data: ISigUpParam) => {
    await fetchSigUp(data)
      .then((response) => {
        const { error } = (response as IErrorResponse);
        if (!error) {
          getUser();
        } else {
          const { data } = error;
          const type: string = TYPES_ALERT.ERROR;
          dispatch(showAlert({
            text: data?.reason ?? '',
            type: type as IAlertTypeProps
          }))
        }
      });
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.form}>
        <Grid
          container
          spacing={0}
          direction='column'
          alignItems='center'
          justifyContent='center'
          className={styles.layout}
        >
          <Grid item xs={12} className={styles.input}>
            <TextField name={InputName.displayName} label={InputLabel.displayName} autoFocus />
          </Grid>

          <Grid item xs={12} className={styles.input}>
            <TextField name={InputName.firstName} label={InputLabel.firstName} />
          </Grid>

          <Grid item xs={12} className={styles.input}>
            <TextField name={InputName.secondName} label={InputLabel.secondName} />
          </Grid>

          <Grid item xs={12} className={styles.input}>
            <TextField name={InputName.login} label={InputLabel.login} />
          </Grid>

          <Grid item xs={12} className={styles.input}>
            <TextField name={InputName.email} label={InputLabel.email} />
          </Grid>

          <Grid item xs={12} className={styles.input}>
            <TextField name={InputName.phone} label={InputLabel.phone} />
          </Grid>

          <Grid item xs={12} className={styles.input}>
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
