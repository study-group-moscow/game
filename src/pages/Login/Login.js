import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { lazy } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Container, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import styles from './login.module.scss';
import { InputLabel, InputName } from '../../utils/consts';
const TextField = lazy(() => import(/* webpackChunkName: "TextField" */ '../../components/TextField/TextField'));
const schema = yup.object()
    .shape({
    password: yup.string()
        .required('Пароль не указан.')
        .min(8, 'Пароль может содержать только латинские буквы.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    login: yup.string()
        .required('Логин не указан.')
});
const Login = () => {
    const methods = useForm({
        defaultValues: {
            login: '',
            password: ''
        },
        mode: 'onBlur',
        resolver: yupResolver(schema)
    });
    const onSubmit = (data) => console.log(data);
    return (_jsx(FormProvider, Object.assign({}, methods, { children: _jsx(Container, Object.assign({ style: { width: '100%', height: '100%' } }, { children: _jsx("form", Object.assign({ className: styles.Login, onSubmit: methods.handleSubmit(onSubmit) }, { children: _jsxs(Grid, Object.assign({ container: true, spacing: 2 }, { children: [_jsx(Grid, Object.assign({ item: true, xs: 12 }, { children: _jsx(TextField, { name: InputName.login, label: InputLabel.login }) })), _jsx(Grid, Object.assign({ item: true, xs: 12 }, { children: _jsx(TextField, { name: InputName.password, label: InputLabel.password }) })), _jsx(Grid, Object.assign({ item: true, xs: 12 }, { children: _jsx(Button, Object.assign({ variant: 'contained', color: 'success', type: 'submit' }, { children: "\u0412\u043E\u0439\u0442\u0438" })) }))] })) })) })) })));
};
export default Login;
//# sourceMappingURL=Login.js.map