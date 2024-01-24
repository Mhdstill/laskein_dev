import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Switch,
} from '@mui/material';
import { useField, useFormikContext } from 'formik';

const OSCheckbox = ({ name, label, isSwith, legend, ...otherProps }: any) => {
  const { setFieldValue } = useFormikContext();

  const [field, meta] = useField(name);

  const checked = field.value || false;

  const handleChange = (event: any) => {
    const { checked } = event.target;
    setFieldValue(name, checked);
  };

  const config = {
    ...field,
    ...otherProps,
    checked,
    onChange: handleChange,
  };

  const configFormControl = {} as any;
  if (meta && meta.touched && meta.error) {
    configFormControl.error = true;
  }

  return (
    <>
      <FormControl {...configFormControl}>
        <FormLabel component="legend">{legend}</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              isSwith ? <Switch {...config} /> : <Checkbox {...config} />
            }
            label={label}
            labelPlacement="start"
          />
        </FormGroup>
      </FormControl>
      <FormHelperText color="error">{meta.error}</FormHelperText>
    </>
  );
};

export default OSCheckbox;
