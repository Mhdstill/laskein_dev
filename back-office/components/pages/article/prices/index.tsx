import CloseRounded from '@mui/icons-material/CloseRounded';
import Save from '@mui/icons-material/Save';

import PriceDTO from 'data/dto/Price.dto';
import { Form, Formik, FormikValues } from 'formik';
import { createPrice, updatePrice } from 'services/redux/article/price';
import { cancelEditPrice } from 'services/redux/article/price/priceSlice';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import * as Yup from 'yup';
import PageTitle from '../../../shared/PageTitle';
import useFetchArticleListeFiltered from '../articles/hooks/useFetchArticleListFiltered';
import PriceForm from './PriceForm';
import PriceTable from './PriceTable';
import useFetchPricListe from './hooks/useFetchPriceList';
import { MuiContainedButton } from './styles';

export default function Prices() {
  const dispatch = useAppDispatch();

  const { isEditing, price } = useAppSelector((state) => state.price);
  const fetchArticleList = useFetchArticleListeFiltered();
  const fetchPriceList = useFetchPricListe();

  const handleSubmit = async (value: FormikValues) => {
    try {
      value.currentPrice = +value?.currentPrice;
      value.oldPrice = +value?.oldPrice;
      value.rate = +value?.rate;
      value.reduction = +value?.reduction;
      value.sellingPrice = +value?.sellingPrice;
      if (isEditing) {
        await dispatch(
          updatePrice({
            id: price.id as string,
            price: {
              articleId: value.articleId,
              oldPrice: value.oldPrice,
              sellingPrice: value.sellingPrice,
              rate: value.rate,
              reference: value.reference,
              currentPrice: value.currentPrice,
              reduction: value.reduction,
            },
          })
        );
      } else {
        await dispatch(createPrice(value as PriceDTO));
      }
      fetchPriceList();
      fetchArticleList();
    } catch (e) {
      /** show error here */
    }
  };
  return (
    <Formik
      enableReinitialize
      initialValues={
        isEditing
          ? price
          : {
              reference: '',
              currentPrice: '',
              oldPrice: '',
              rate: '',
              sellingPrice: '',
              reduction: '',
              articleId: '',
            }
      }
      validationSchema={Yup.object({
        reference: Yup.string().required('Champ obligatoire'),
        currentPrice: Yup.number().required('Champ obligatoire'),
        articleId: Yup.string().required('Champ obligatoire'),
      })}
      onSubmit={async (value: any, action) => {
        await handleSubmit(value);
        action.resetForm();
      }}
    >
      {(formikProps) => (
        <Form>
          <div className="bg-white h-full pb-2.5 w-full">
            <PageTitle title1="Gestion prix" title2={'Ajout | Modification'} />

            <div className="h-[calc(100%_-_58px)]">
              <div className="p-2.5 flex w-full">
                <PriceForm />
              </div>
              <div className="w-full flex gap-2.5 justify-end px-5">
                <MuiContainedButton
                  variant="contained"
                  color="warning"
                  startIcon={<CloseRounded />}
                  className="!bg-orange-500 !normal-case text-white"
                  onClick={() => {
                    formikProps.resetForm();
                    dispatch(cancelEditPrice());
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

              <PriceTable />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
