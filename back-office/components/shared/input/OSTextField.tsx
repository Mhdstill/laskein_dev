import TextField from '@mui/material/TextField';
import { useField } from 'formik';

const OSTextField = ({ name, ...otherProps }: any) => {
  const [field, meta] = useField(name);

  const configTextField = {
    fullWidth: true,
    size: 'small',
    variant: 'outlined',
    ...field,
    ...otherProps,
  };

  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  return <TextField {...configTextField} />;
};

export default OSTextField;
