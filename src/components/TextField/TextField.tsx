import React from 'react';
import { RefCallBack, useFormContext } from 'react-hook-form';
import MUITextField from '@mui/material/TextField';

interface ITextFieldProps {
  name?: string;
  label?: string;
  type?: string;
  autoFocus?: boolean;
  inputRef?: RefCallBack;
}

const TextField = ({ name = '', ...rest }: ITextFieldProps) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <MUITextField
      {...register(name)}
      {...rest}
      fullWidth
      error={Boolean(errors?.[name]?.message)}
      helperText={errors?.[name]?.message}
      size='small'
    />
  )
}

export default TextField
