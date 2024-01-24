import CloseRounded from '@mui/icons-material/CloseRounded';
import Save from '@mui/icons-material/Save';

import PermissionDTO from 'data/dto/Permission.dto';
import { Form, Formik } from 'formik';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { createPermission, updatePermission } from 'services/redux/permission';
import { cancelEditPermission } from 'services/redux/permission/modelsSlice';
import * as Yup from 'yup';
import PageTitle from '../../../shared/PageTitle';
import PermissionForm from './Form';
import PermissionTable from './Table';
import useFetchPermissionListe from './hooks/useFetchPermissionList';
import ModelInRuleComponent from './model';
import { MuiContainedButton } from './styles';

export default function Permissions() {
  const { showModelInRule } = useAppSelector((state) => state.rule);
  const dispatch = useAppDispatch();
  const { permission, isEditing } = useAppSelector((state) => state.permission);
  const initialValues: PermissionDTO = {
    keyword: '',
    name: '',
  };
  const fetchPermissionListe = useFetchPermissionListe();

  const handleSubmit = async (value: PermissionDTO) => {
    try {
      if (isEditing) {
        await dispatch(
          updatePermission({
            id: permission.id as string,
            permission: {
              keyword: value.keyword,
              name: value.name,
            },
          })
        );
      } else {
        await dispatch(createPermission(value));
      }
      fetchPermissionListe();
    } catch (e) {
      /** show error here */
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={isEditing ? permission : initialValues}
      validationSchema={Yup.object({
        keyword: Yup.string().required('Champ obligatoire'),
        name: Yup.string().required('Champ obligatoire'),
      })}
      onSubmit={async (value: PermissionDTO, action) => {
        await handleSubmit(value);
        action.resetForm({ values: initialValues });
      }}
    >
      {(formikProps) => (
        <Form>
          {showModelInRule ? (
            <ModelInRuleComponent />
          ) : (
            <div className="bg-white h-full pb-2.5 w-full">
              <PageTitle title1="Gestion permission" title2={'Ajout'} />

              <div className="h-[calc(100%_-_58px)]">
                <PermissionForm />
                <div className="w-full flex gap-2.5 justify-end px-2.5">
                  <MuiContainedButton
                    variant="contained"
                    color="warning"
                    startIcon={<CloseRounded />}
                    className="!bg-orange-500 !normal-case text-white"
                    onClick={() => {
                      formikProps.resetForm();
                      dispatch(cancelEditPermission());
                    }}
                  >
                    Annuler
                  </MuiContainedButton>

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
                </div>

                <div className="w-full h-[1px] bg-gray-300 my-2"></div>

                <PermissionTable />
              </div>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
}
