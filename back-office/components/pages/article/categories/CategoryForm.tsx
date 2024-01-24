import CloseRounded from '@mui/icons-material/CloseRounded';
import Save from '@mui/icons-material/Save';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import CategoryDTO from '../../../../data/dto/Category.dto';
import {
  createCategory,
  getCategoryList,
  updateCategory,
} from '../../../../services/redux/article/category';
import { cancelEditCategory } from '../../../../services/redux/article/category/categorySlice';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../services/redux/hooks';
import OSTextField from '../../../shared/input/OSTextField';
import { MuiContainedButton } from './styles';

export default function CategoryForm() {
  const dispatch = useAppDispatch();

  const { isEditing, category } = useAppSelector((state) => state.category);

  const initialValues: CategoryDTO = {
    reference: '',
    name: '',
  };

  const handleSubmit = async (value: CategoryDTO) => {
    try {
      if (isEditing) {
        await dispatch(
          updateCategory({
            id: category.id as string,
            category: {
              reference: value.reference,
              name: value.name,
            },
          })
        );
      } else {
        await dispatch(createCategory(value));
      }
      await dispatch(getCategoryList({}));
    } catch (e) {
      /** show error here */
    }
  };
  return (
    <Formik
      enableReinitialize
      initialValues={isEditing ? category : initialValues}
      validationSchema={Yup.object({
        reference: Yup.string().required('Champ obligatoire'),
        name: Yup.string().required('Champ obligatoire'),
      })}
      onSubmit={async (value: CategoryDTO, action) => {
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
                  dispatch(cancelEditCategory());
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
