import React from 'react';
import { useFormContext } from 'react-hook-form';
import Input from '@mui/material/TextField/TextField';

interface ITextFieldProps {
  name?: string;
  label?: string;
  type?: string;
  autoFocus?: boolean;
}

const TextField = ({ name = '', ...rest }: ITextFieldProps) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <Input
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
