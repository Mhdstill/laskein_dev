import CloseRounded from '@mui/icons-material/CloseRounded';
import Save from '@mui/icons-material/Save';
import * as Yup from 'yup';

import OSTextField from 'components/shared/input/OSTextField';
import UnitySizeDTO from 'data/dto/UnitySize.dto';
import { Form, Formik } from 'formik';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { cancelEditModels } from 'services/redux/model/modelsSlice';
import { createUnitySize, updateUnitySize } from 'services/redux/unitySize';
import UnitySizeTable from '.';
import PageTitle from '../../../shared/PageTitle';
import useFetchUnitySizeListe from './hooks/useFetchUnitySize';
import { MuiContainedButton } from './styles';

export default function UnitySizeForm() {
  const { isEditing, unitySize } = useAppSelector((state) => state.unitySize);
  const fetchUnitySizeListe = useFetchUnitySizeListe();
  const dispatch = useAppDispatch();

  const initialValues: UnitySizeDTO = {
    abbreviation: '',
    name: '',
  };

  const handleSubmit = async (value: UnitySizeDTO) => {
    try {
      if (isEditing) {
        await dispatch(
          updateUnitySize({
            id: unitySize.id as string,
            unitySize: {
              abbreviation: value.abbreviation,
              name: value.name,
            },
          })
        );
      } else {
        await dispatch(createUnitySize(value));
      }
      fetchUnitySizeListe();
    } catch (e) {
      /** show error here */
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={isEditing ? unitySize : initialValues}
      validationSchema={Yup.object({
        abbreviation: Yup.string().required('Champ obligatoire'),
        name: Yup.string().required('Champ obligatoire'),
      })}
      onSubmit={async (value: UnitySizeDTO, action) => {
        await handleSubmit(value);
        action.resetForm({ values: initialValues });
      }}
    >
      {(formikProps) => (
        <Form>
          <div className="bg-white h-full pb-2.5 w-full">
            <PageTitle title1="Gestion de Taille unitaire" title2={'Ajout'} />

            <div className="h-[calc(100%_-_58px)]">
              <div className="flex w-full">
                <div className="h-full p-2.5 w-full flex gap-2.5">
                  <OSTextField name="name" size="small" label="Nom" />
                  <OSTextField
                    name="abbreviation"
                    size="small"
                    label="Abreviation"
                  />
                </div>
              </div>
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

              <UnitySizeTable />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
