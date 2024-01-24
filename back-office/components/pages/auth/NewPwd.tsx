import { VisibilityOff } from '@mui/icons-material';
import Lock from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import * as Yup from 'yup';
import { setNewPwd } from '../../../services/redux/auth';
import { useAppDispatch } from '../../../services/redux/hooks';
import { enqueueSnackbar } from '../../../services/redux/notification/notificationSlice';
import UserCircleIcon from '../../icons/svg/UserCircleIcon';
import OSTextField from '../../shared/input/OSTextField';

export default function NewPwdComponent() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showPwd, setShowPwd] = React.useState(false);
  const [showPwdC, setShowPwdC] = React.useState(false);
  const [tokenUrl, setTokenUrl] = React.useState('');

  const initialValue = {
    password: '',
    confirmPassword: '',
  };

  React.useEffect(() => {
    if (router.query.token) {
      getTokenUrl();
    }
  }, []);

  const getTokenUrl = async () => {
    const token: any =
      router.query.token !== undefined ? router.query.token : '';
    setTokenUrl(token);
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#2F435E]">
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
              await dispatch(
                setNewPwd({
                  password: values.password,
                  token: tokenUrl,
                })
              ).unwrap();
              dispatch(
                enqueueSnackbar({
                  message: `Votre mot de passe a ete mis a jours`,
                  options: { variant: 'success' },
                })
              );
              router.push('/auth/login');
              actions.setSubmitting(false);
            } catch (error) {
              dispatch(
                enqueueSnackbar({
                  message: `Impossible de reinitialiser votre mots de passe`,
                  options: { variant: 'error' },
                })
              );
              actions.setSubmitting(false);
            }
          }}
        >
          {() => (
            <Form>
              <div className="flex flex-col gap-2.5 w-full">
                <OSTextField
                  variant="outlined"
                  type={showPwd ? 'text' : 'password'}
                  name="password"
                  size="small"
                  fullWidth
                  label="Nouveau mot de passe"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPwd(!showPwd)}
                          aria-label="Afficher"
                        >
                          {showPwd ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <OSTextField
                  variant="outlined"
                  type={showPwdC ? 'text' : 'password'}
                  name="confirmPassword"
                  size="small"
                  fullWidth
                  label="Confirmer mot de passe"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPwdC(!showPwdC)}
                          aria-label="Afficher"
                        >
                          {showPwdC ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              <Button
                variant="contained"
                size="medium"
                fullWidth
                color="primary"
                className="bg-[#2F435E]"
                type="submit"
              >
                Enregistrer
              </Button>

              <div className="flex w-full justify-center items-center">
                <Button
                  variant="text"
                  size="small"
                  onClick={() => router.push('/auth/login')}
                >
                  Se connecter
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
    </div>
  );
}

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required('Obligatoire')
    .min(10, '10 caractères au minimum')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{10,})/i,
      'Doit contenir une majuscule, une minuscule, un chiffre et un caractère spécial.'
    ),
  confirmPassword: Yup.string()
    .required('Obligatoire')
    .test(
      'passwords-match',
      'Les mots de passe ne correspondent pas',
      function (value) {
        return this.parent.password === value;
      }
    ),
});
