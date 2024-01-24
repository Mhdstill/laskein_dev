import CloseRounded from '@mui/icons-material/CloseRounded';
import Edit from '@mui/icons-material/Edit';
import Save from '@mui/icons-material/Save';
import UserDTO from 'data/dto/User.dto';
import { Form, Formik } from 'formik';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { updateMember } from 'services/redux/users/member';
import { cancelEditMember } from 'services/redux/users/member/memberSlice';
import * as Yup from 'yup';
import PageTitle from '../../shared/PageTitle';
import MemberDetails from './MemberDetails';
import MemberForm from './MemberForm';
import { MemberTable } from './MemberTable';
import useFetchMemberListe from './hooks/useFetchMemberList';
import { MuiContainedButton } from './styles';

const MemberComponent = () => {
  const [activeUi, setActiveUi] = React.useState<'none' | 'form' | 'details'>(
    'none'
  );
  const dispatch = useAppDispatch();
  const fetchList = useFetchMemberListe();
  const { isEditing, member } = useAppSelector((state) => state.member);
  const initialValue: UserDTO = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    isActif: false,
    phone: '',
    photoUrl: '',
  };
  const validationSchema = Yup.object({
    firstName: Yup.string().required('Champ obligatoire'),
    lastName: Yup.string().required('Champ obligatoire'),
    username: Yup.string().required('Champ obligatoire'),
    email: Yup.string().required('Champ obligatoire'),
    isActif: Yup.boolean().required('Champ obligatoire'),
  });

  const cancleEdit = () => {
    dispatch(cancelEditMember());
    setActiveUi('none');
  };

  return (
    <div className="bg-white h-full py-2.5 w-full">
      <PageTitle
        title1="Gestion membre"
        title2={activeUi === 'form' ? 'Modification' : 'Liste'}
      />

      <div className="h-[calc(100%_-_58px)]">
        <Scrollbars>
          {activeUi === 'none' ? (
            <div className="flex w-full h-[275px] justify-center items-center text-[#2F435E] text-h5">
              Aucun membre sélectionnée
            </div>
          ) : (
            <Formik
              enableReinitialize
              initialValues={
                isEditing
                  ? {
                      ...member,
                      isActif: member.isActif ? true : false,
                    }
                  : initialValue
              }
              validationSchema={validationSchema}
              onSubmit={async (value: UserDTO) => {
                if (member.id) {
                  await dispatch(
                    updateMember({
                      id: member.id,
                      user: { isActif: value.isActif },
                    })
                  );
                  fetchList();
                  setActiveUi('none');
                }
              }}
            >
              {() => (
                <Form>
                  <div className="p-2.5 h-auto flex w-full">
                    {activeUi === 'form' && <MemberForm />}
                    {activeUi === 'details' && <MemberDetails />}
                  </div>
                  <div className="w-full flex gap-2.5 justify-end">
                    {activeUi === 'form' && (
                      <MuiContainedButton
                        variant="contained"
                        color="warning"
                        startIcon={<CloseRounded />}
                        type="reset"
                        onClick={cancleEdit}
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
                        Mettre à jour
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
          <MemberTable setActiveUi={setActiveUi} />
        </Scrollbars>
      </div>
    </div>
  );
};

export default MemberComponent;
