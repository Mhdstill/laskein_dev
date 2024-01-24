import CloseRounded from '@mui/icons-material/CloseRounded';
import Save from '@mui/icons-material/Save';
import { Form, Formik } from 'formik';
import { useEffect } from 'react';
import * as Yup from 'yup';
import SubCategoryDTO from '../../../../../data/dto/SubCategory.dto';
import { getCategoryList } from '../../../../../services/redux/article/category';
import {
  createSubCategory,
  updateSubCategory,
} from '../../../../../services/redux/article/sub-category';
import { cancelEditSubCategory } from '../../../../../services/redux/article/sub-category/subCategorySlice';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../services/redux/hooks';
import OSTextField from '../../../../shared/input/OSTextField';
import OSSelectField from '../../../../shared/select/OSSelectField';
import useFetchSubCategoryListe from '../hooks/useFetchSubCategoryList';
import { MuiContainedButton } from '../styles';

export default function SubCategoryForm() {
  const dispatch = useAppDispatch();

  const { isEditing, subCategory } = useAppSelector(
    (state) => state.subCategory
  );

  const { categoryList } = useAppSelector((state) => state.category);
  const fetchSubCategoryList = useFetchSubCategoryListe();

  useEffect(() => {
    dispatch(getCategoryList({}));
    fetchSubCategoryList();
  }, []);

  const handleSubmit = async (value: SubCategoryDTO) => {
    try {
      if (isEditing) {
        await dispatch(
          updateSubCategory({
            id: subCategory.id as string,
            subCategory: {
              reference: value.reference,
              name: value.name,
              categoryId: value.categoryId,
            },
          })
        );
      } else {
        await dispatch(createSubCategory(value));
      }
      fetchSubCategoryList();
    } catch (e) {
      /** show error here */
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={
        isEditing
          ? subCategory
          : {
              reference: '',
              name: '',
              categoryId: '',
            }
      }
      validationSchema={Yup.object({
        reference: Yup.string().required('Champ obligatoire'),
        name: Yup.string().required('Champ obligatoire'),
        categoryId: Yup.string().required('Champ obligatoire'),
      })}
      onSubmit={async (value: any, action) => {
        await handleSubmit(value);
        action.resetForm();
      }}
    >
      {(formikProps) => (
        <Form>
          <div className="flex flex-col w-full">
            <div className="h-full p-2.5 w-full flex lg:flex-row md:flex-row sm:flex-col gap-2.5">
              <OSTextField name="reference" size="small" label="Référence" />
              <OSSelectField
                id="category"
                name="categoryId"
                label="category"
                dataKey="name"
                options={categoryList}
                valueKey="id"
              />
              <OSTextField
                name="name"
                size="small"
                label="Nom sous catégorie"
              />
            </div>
            <div className="w-full flex gap-2.5 justify-end px-5">
              <MuiContainedButton
                variant="contained"
                color="warning"
                startIcon={<CloseRounded />}
                className="!bg-orange-500 !normal-case text-white"
                onClick={() => {
                  formikProps.resetForm();
                  dispatch(cancelEditSubCategory());
                }}
              >
                Annuler
              </MuiContainedButton>

              <MuiContainedButton
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<Save />}
                className="!normal-case bg-[#376F70] text-white"
                sx={{
                  background: '#376F70',
                }}
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
