import React from 'react';

import AccountCircle from '@mui/icons-material/AccountCircle';
import Lock from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

import { Checkbox, CircularProgress } from '@mui/material';
import { login } from '../../../services/redux/auth';
import { useAppDispatch } from '../../../services/redux/hooks';
import { enqueueSnackbar } from '../../../services/redux/notification/notificationSlice';
import { VERSION } from '../../../utils/version';
import UserCircleIcon from '../../icons/svg/UserCircleIcon';
import OSTextField from '../../shared/input/OSTextField';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Adresse e-mail non valide')
    .required('Obligatoire'),
  password: Yup.string().required('Obligatoire'),
});

export default function LoginComponent() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [visible, setVisible] = React.useState<boolean>(false);
  /* eslint-disable */
  const [formError, setFormError]: any = React.useState('');
  const dispatch = useAppDispatch();
  const initialValue = {
    email: '',
    password: '',
    remember: false,
  };
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#2F435E] relative">
      <div className="bg-white px-12 py-2.5 rounded-[10px] w-[519px] flex flex-col items-center gap-[25px]">
        <Typography variant="h4" align="center" color="primary">
          LasKein
        </Typography>

        <div className="flex gap-2.5 w-full items-center">
          <div className="w-full h-[1px] bg-[#2F435E]"></div>
          <div className="w-[168px] h-[174px]">
            <UserCircleIcon />
          </div>
          <div className="w-full h-[1px] bg-[#2F435E]"></div>
        </div>
        <Formik
          initialValues={initialValue}
          validationSchema={validationSchema}
          onSubmit={async (values, actions) => {
            try {
              setIsLoading(true);
              await dispatch(
                login({
                  email: values.email,
                  password: values.password,
                  remember: values.remember,
                })
              ).unwrap();
              dispatch(
                enqueueSnackbar({
                  message: `Bienvenue`,
                  options: { variant: 'success' },
                })
              );
              router.push('/');
              setFormError(undefined);
              actions.setSubmitting(false);
            } catch (error) {
              setFormError('E-mail ou mot de passe incorrect');
              actions.setSubmitting(false);
              setIsLoading(false);
            }
          }}
        >
          {(formik) => (
            <Form>
              <div className="flex flex-col gap-2.5 w-full">
                <OSTextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="email"
                  label="Nom utilisateur ou email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
                <OSTextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type={visible ? 'text' : 'password'}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        className="cursor-pointer"
                        onClick={() => setVisible(!visible)}
                      >
                        {visible ? <VisibilityOff /> : <Visibility />}
                      </InputAdornment>
                    ),
                  }}
                />

                {formError && <Alert severity="error">{formError}</Alert>}
              </div>

              <Button
                variant="contained"
                size="medium"
                fullWidth
                type="submit"
                color="primary"
                className="bg-[#2F435E] my-2.5"
                disabled={isLoading}
                startIcon={
                  isLoading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : null
                }
              >
                Se connecter
                {/* {isLoading ? 'Chargement...' : 'Se connecter'} */}
              </Button>

              <div className="flex w-full justify-between items-center">
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Se souvenir de moi"
                />
                <Button
                  variant="text"
                  size="small"
                  onClick={() => router.push('/auth/forgot-password')}
                >
                  Mot de passe oublié?
                </Button>
              </div>
            </Form>
          )}
        </Formik>

        <div className="w-full h-[1px] bg-[#2F435E]"></div>

        <Typography variant="body2" color="primary" align="center">
          Copyright © 2023 Laskein powered by Objectif
        </Typography>
      </div>

      {/* version */}
      <div className="absolute bottom-0 right-0 text-gray-400 text-[10px]">
        v.{VERSION}
      </div>
    </div>
  );
}
