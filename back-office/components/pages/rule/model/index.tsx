import CloseRounded from '@mui/icons-material/CloseRounded';
import Save from '@mui/icons-material/Save';
import * as Yup from 'yup';

import ModelDTO from 'data/dto/Model.dto';
import { Form, Formik } from 'formik';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { createModels, updateModels } from 'services/redux/model';
import { cancelEditModels } from 'services/redux/model/modelsSlice';
import PageTitle from '../../../shared/PageTitle';
import ModelForm from './Form';
import ModelTable from './Table';
import useFetchModelListe from './hooks/useFetchModelsList';
import { MuiContainedButton } from './styles';

export default function Models() {
  const dispatch = useAppDispatch();

  const { isEditing, models } = useAppSelector((state) => state.models);

  const initialValues: ModelDTO = {
    keyword: '',
    name: '',
  };
  const fetchModelList = useFetchModelListe();

  const handleSubmit = async (value: ModelDTO) => {
    try {
      if (isEditing) {
        await dispatch(
          updateModels({
            id: models.id as string,
            models: {
              keyword: value.keyword,
              name: value.name,
            },
          })
        );
      } else {
        await dispatch(createModels(value));
      }
      fetchModelList();
    } catch (e) {
      /** show error here */
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={isEditing ? models : initialValues}
      validationSchema={Yup.object({
        keyword: Yup.string().required('Champ obligatoire'),
        name: Yup.string().required('Champ obligatoire'),
      })}
      onSubmit={async (value: ModelDTO, action) => {
        await handleSubmit(value);
        action.resetForm({ values: initialValues });
      }}
    >
      {(formikProps) => (
        <Form>
          <div className="bg-white h-full pb-2.5 w-full">
            <PageTitle title1="Gestion model" title2={'Ajout'} />

            <div className="h-[calc(100%_-_58px)]">
              <ModelForm />
              <div className="w-full flex gap-2.5 justify-end px-2.5">
                <MuiContainedButton
                  variant="contained"
                  color="warning"
                  startIcon={<CloseRounded />}
                  className="!bg-orange-500 !normal-case text-white"
                  onClick={() => {
                    formikProps.resetForm();
                    dispatch(cancelEditModels());
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

              <ModelTable />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
