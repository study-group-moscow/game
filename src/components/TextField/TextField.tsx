import React from 'react';
import { useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';

interface ITextFieldProps {
  name?: string;
  label?: string;
  type?: string;
  autoFocus?: boolean;
}

const TxtField = ({ name = '', ...rest }: ITextFieldProps) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <TextField
      {...register(name)}
      {...rest}
      fullWidth
      error={Boolean(errors?.[name]?.message)}
      helperText={errors?.[name]?.message}
      size='small'
    />
  )

  // return (
  //   <div>AAAA</div>
  // )
}

export default TxtField
