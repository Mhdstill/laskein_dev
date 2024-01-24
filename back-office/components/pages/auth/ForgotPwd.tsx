import { AccountCircle } from '@mui/icons-material';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { forgotPwd } from '../../../services/redux/auth';
import { useAppDispatch } from '../../../services/redux/hooks';
import { enqueueSnackbar } from '../../../services/redux/notification/notificationSlice';
import RefreshIcon from '../../icons/svg/RefreshIcon';
import OSTextField from '../../shared/input/OSTextField';

export default function ForgotPwdComponent() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#2F435E]">
      <div className="bg-white px-12 py-2.5 rounded-[10px] w-[519px] flex flex-col items-center gap-[25px]">
        <Typography variant="h4" align="center" color="primary">
          LasKein
        </Typography>

        <div className="flex gap-2.5 w-full items-center">
          <div className="w-full h-[1px] bg-[#2F435E]"></div>
          <div className="w-[168px] h-[174px]">
            <RefreshIcon />
          </div>
          <div className="w-full h-[1px] bg-[#2F435E]"></div>
        </div>

        <Formik
          initialValues={{
            email: '',
            url: `${process.env.NEXT_PUBLIC_URL}auth/new-password`,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, actions) => {
            try {
              await dispatch(
                forgotPwd({
                  email: values.email,
                  url: values.url,
                })
              ).unwrap();
              dispatch(
                enqueueSnackbar({
                  message: `Un email vous a ete envoyer`,
                  options: { variant: 'success' },
                })
              );
              router.push('/auth/login');
              actions.setSubmitting(false);
            } catch (error) {
              dispatch(
                enqueueSnackbar({
                  message: `Email introuvable`,
                  options: { variant: 'error' },
                })
              );
              actions.setSubmitting(false);
            }
          }}
        >
          {() => (
            <Form>
              <div className="flex flex-col gap-2.5 w-full mb-2">
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
              </div>

              <Button
                variant="contained"
                size="medium"
                fullWidth
                color="primary"
                className="bg-[#2F435E]"
                type="submit"
              >
                Réinitialiser
              </Button>
            </Form>
          )}
        </Formik>

        <div className="flex w-full justify-center items-center">
          <Button
            variant="text"
            size="small"
            onClick={() => router.push('/auth/login')}
          >
            Se connecter
          </Button>
        </div>

        <div className="w-full h-[1px] bg-[#2F435E]"></div>

        <Typography variant="body2" color="primary" align="center">
          Copyright © 2023 Laskein powered by Objectif
        </Typography>
      </div>
    </div>
  );
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Adresse e-mail non valide')
    .required('Obligatoire'),
});
