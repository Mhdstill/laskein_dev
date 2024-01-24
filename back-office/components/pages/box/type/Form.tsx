import CloseRounded from '@mui/icons-material/CloseRounded';
import Save from '@mui/icons-material/Save';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import BoxTypeDTO from '../../../../data/dto/BoxType.dto';
import {
  createBoxType,
  getBoxTypeList,
  updateBoxType,
} from '../../../../services/redux/box/type';
import { cancelEditBoxType } from '../../../../services/redux/box/type/boxTypeSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../services/redux/hooks';
import OSTextField from '../../../shared/input/OSTextField';
import { MuiContainedButton } from './styles';

export default function BoxTypeForm() {
  const dispatch = useAppDispatch();

  const { isEditing, boxType } = useAppSelector((state) => state.boxType);

  const initialValues: BoxTypeDTO = {
    reference: '',
    name: '',
  };

  const handleSubmit = async (value: BoxTypeDTO) => {
    try {
      if (isEditing) {
        await dispatch(
          updateBoxType({
            id: boxType.id as string,
            boxType: {
              reference: value.reference,
              name: value.name,
            },
          })
        );
      } else {
        await dispatch(createBoxType(value));
      }
      await dispatch(getBoxTypeList({}));
    } catch (e) {
      /** show error here */
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={isEditing ? boxType : initialValues}
      validationSchema={Yup.object({
        reference: Yup.string().required('Champ obligatoire'),
        name: Yup.string().required('Champ obligatoire'),
      })}
      onSubmit={async (value: BoxTypeDTO, action) => {
        await handleSubmit(value);
        action.resetForm({ values: initialValues });
      }}
    >
      {(formikProps) => (
        <Form>
          <div className="flex flex-col w-full">
            <div className="h-full p-2.5 w-full flex gap-2.5">
              <OSTextField name="reference" size="small" label="Référence" />
              <OSTextField name="name" size="small" label="Nom catégorie" />
            </div>
            <div className="w-full flex gap-2.5 justify-end px-2.5">
              <MuiContainedButton
                variant="contained"
                color="warning"
                type="reset"
                startIcon={<CloseRounded />}
                className="!bg-orange-500 !normal-case text-white"
                onClick={() => {
                  formikProps.resetForm();
                  dispatch(cancelEditBoxType());
                }}
              >
                Annuler
              </MuiContainedButton>

              <MuiContainedButton
                variant="contained"
                color="primary"
                startIcon={<Save />}
                className="!normal-case bg-[#376F70] text-white"
                type="submit"
              >
                Enregistrer
              </MuiContainedButton>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
