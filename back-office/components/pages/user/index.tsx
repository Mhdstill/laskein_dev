import CloseRounded from '@mui/icons-material/CloseRounded';
import Edit from '@mui/icons-material/Edit';
import Save from '@mui/icons-material/Save';
import UserDTO from 'data/dto/User.dto';
import { Form, Formik } from 'formik';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { postFile } from 'services/redux/file/useCase/postFile';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import {
  createUtilisateur,
  updateUtilisateur,
} from 'services/redux/users/admin';
import { cancelEditUtilisateur } from 'services/redux/users/admin/utilsateurSlice';
import * as Yup from 'yup';
import PageTitle from '../../shared/PageTitle';
import UserDetails from './UserDetails';
import UserForm from './UserForm';
import UserTable from './UserTable';
import useFetchUserListe from './hooks/useFetchUserList';
import { MuiContainedButton } from './styles';

export default function UserComponent() {
  const [activeUi, setActiveUi] = React.useState<'none' | 'form' | 'details'>(
    'form'
  );
  const [selectedPicture, setSelectedPicture] = React.useState<string>('');
  const dispatch = useAppDispatch();
  const fetchList = useFetchUserListe();
  const { isEditing, utilisateur } = useAppSelector(
    (state) => state.utilisateur
  );
  const initialValue: UserDTO = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    isActif: false,
    ruleId: '',
    photoUrl: '',
    phone: '',
    password: '',
    confirmPassword: '',
  };
  const validationSchema = Yup.object({
    firstName: Yup.string().required('Champ obligatoire'),
    lastName: Yup.string().required('Champ obligatoire'),
    username: Yup.string().required('Champ obligatoire'),
    phone: Yup.string().required('Champ obligatoire'),
    email: Yup.string().email().required('Champ obligatoire'),
    ruleId: Yup.string().required('Champ obligatoire'),
    isActif: Yup.boolean().required('Champ obligatoire'),
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

  const validationSchemaEditing = Yup.object({
    firstName: Yup.string().required('Champ obligatoire'),
    lastName: Yup.string().required('Champ obligatoire'),
    username: Yup.string().required('Champ obligatoire'),
    phone: Yup.string().required('Champ obligatoire'),
    email: Yup.string().email().required('Champ obligatoire'),
    ruleId: Yup.string().required('Champ obligatoire'),
    isActif: Yup.boolean().required('Champ obligatoire'),
  });

  return (
    <div className="bg-white h-full py-2.5 w-full">
      <PageTitle
        title1="Gestion utilisateur"
        title2={activeUi === 'form' ? 'Ajout | Modification' : 'Liste'}
      />

      <div className="h-[calc(100%_-_58px)]">
        <Scrollbars>
          {activeUi === 'none' ? (
            <div className="flex w-full h-[275px] justify-center items-center text-[#2F435E] text-h5">
              Aucun utilisateur sélectionnée
            </div>
          ) : (
            <Formik
              enableReinitialize
              initialValues={
                isEditing
                  ? {
                      ...utilisateur,
                    }
                  : initialValue
              }
              validationSchema={
                isEditing ? validationSchemaEditing : validationSchema
              }
              onSubmit={async (value, { resetForm }) => {
                delete value.confirmPassword;
                delete value.address;
                delete value.id;
                delete value.rule;
                delete value.socketId;
                let newUser = value;
                if (selectedPicture?.length > 0) {
                  const { files } = await dispatch(
                    postFile({
                      file: selectedPicture,
                    })
                  ).unwrap();
                  newUser.photoUrl = files[0].url;
                }
                if (isEditing) {
                  await dispatch(
                    updateUtilisateur({
                      id: utilisateur.id as any,
                      user: newUser,
                    })
                  );
                } else {
                  await dispatch(createUtilisateur(newUser));
                }
                fetchList();
                setSelectedPicture('');
                resetForm();
              }}
            >
              {() => (
                <Form>
                  <div className="p-2.5 flex w-full">
                    {activeUi === 'form' && (
                      <UserForm
                        selectedPicture={selectedPicture}
                        setSelectedPicture={setSelectedPicture}
                      />
                    )}
                    {activeUi === 'details' && <UserDetails />}
                  </div>
                  <div className="w-full flex gap-2.5 justify-end">
                    {activeUi === 'form' && (
                      <MuiContainedButton
                        variant="contained"
                        color="warning"
                        startIcon={<CloseRounded />}
                        type="reset"
                        onClick={() => dispatch(cancelEditUtilisateur())}
                        className="!bg-orange-500 !normal-case text-white"
                      >
                        Annuler
                      </MuiContainedButton>
                    )}

                    {activeUi === 'form' && (
                      <MuiContainedButton
                        variant="contained"
                        color="primary"
                        startIcon={<Save />}
                        className="!normal-case bg-[#376F70] text-white"
                        sx={{
                          background: '#376F70',
                        }}
                        type="submit"
                      >
                        Enregistrer
                      </MuiContainedButton>
                    )}

                    {activeUi === 'details' && (
                      <MuiContainedButton
                        variant="contained"
                        color="primary"
                        startIcon={<Edit />}
                        className="normal-case bg-[#376F70] text-white"
                        onClick={() => setActiveUi('form')}
                      >
                        Editer
                      </MuiContainedButton>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          )}
          <div className="w-full h-[1px] bg-gray-300 my-2"></div>
          <UserTable setActiveUi={setActiveUi} />
        </Scrollbars>
      </div>
    </div>
  );
}
