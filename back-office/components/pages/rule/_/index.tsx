import CloseRounded from '@mui/icons-material/CloseRounded';
import Save from '@mui/icons-material/Save';
import * as Yup from 'yup';

import RuleDTO from 'data/dto/Rule.dto';
import { Form, Formik } from 'formik';
import { createRole, updateRole } from 'services/redux/role';
import { cancelEditRole } from 'services/redux/role/modelsSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../services/redux/hooks';
import PageTitle from '../../../shared/PageTitle';
import RuleForm from './RuleForm';
import RuleTable from './RuleTable';
import useFetchRoleListe from './hooks/useFetchRoleList';
import PermissionInRuleComponent from './permission';
import { MuiContainedButton } from './styles';

export default function Rules() {
  const { showPemissionInRule } = useAppSelector((state) => state.rule);
  const dispatch = useAppDispatch();
  const { role, isEditing } = useAppSelector((state) => state.role);
  const initialValues: RuleDTO = {
    keyword: '',
    name: '',
  };
  const fetchRoleListe = useFetchRoleListe();

  const handleSubmit = async (value: RuleDTO) => {
    try {
      if (isEditing) {
        await dispatch(
          updateRole({
            id: role.id as string,
            role: {
              keyword: value.keyword,
              name: value.name,
            },
          })
        );
      } else {
        await dispatch(createRole(value));
      }
      fetchRoleListe();
    } catch (e) {
      /** show error here */
    }
  };
  return (
    <Formik
      enableReinitialize
      initialValues={isEditing ? role : initialValues}
      validationSchema={Yup.object({
        keyword: Yup.string().required('Champ obligatoire'),
        name: Yup.string().required('Champ obligatoire'),
      })}
      onSubmit={async (value: RuleDTO, action) => {
        await handleSubmit(value);
        action.resetForm({ values: initialValues });
      }}
    >
      {(formikProps) => (
        <Form>
          {showPemissionInRule ? (
            <PermissionInRuleComponent />
          ) : (
            <div className="bg-white h-full pb-2.5 w-full">
              <PageTitle title1="Gestion rôle" title2="Ajout" />

              <div className="h-[calc(100%_-_58px)]">
                <RuleForm />

                <div className="w-full flex gap-2.5 justify-end px-2.5">
                  <MuiContainedButton
                    variant="contained"
                    color="warning"
                    startIcon={<CloseRounded />}
                    className="!bg-orange-500 !normal-case text-white"
                    onClick={() => {
                      formikProps.resetForm();
                      dispatch(cancelEditRole());
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

                <RuleTable />
              </div>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
}
