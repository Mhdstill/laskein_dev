import CloseRounded from '@mui/icons-material/CloseRounded';
import Save from '@mui/icons-material/Save';

import ProviderDTO from 'data/dto/Provider.dto';
import { Form, Formik, FormikValues } from 'formik';
import React from 'react';
import { cancelEditArticle } from 'services/redux/article/_/articleSlice';
import {
  createProvider,
  updateProvider,
} from 'services/redux/article/provider';
import { cancelEditProvider } from 'services/redux/article/provider/providerSlice';
import { postFile } from 'services/redux/file/useCase/postFile';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import * as Yup from 'yup';
import PageTitle from '../../../shared/PageTitle';
import ProviderForm from './ProviderForm';
import ProviderTable from './ProviderTable';
import useFetchProviderListe from './hooks/useFetchProviderList';
import { MuiContainedButton } from './styles';

export default function Providers() {
  const dispatch = useAppDispatch();
  const [selectedPicture, setSelectedPicture] = React.useState<string>('');
  const { provider, isEditing } = useAppSelector((state) => state.provider);
  const initialValues: FormikValues = {
    reference: isEditing ? provider?.reference : '',
    companyName: isEditing ? provider?.companyName : '',
    address: isEditing ? provider?.address : '',
    logo: isEditing ? provider?.logo : '',
    webSite: isEditing ? provider?.webSite : '',
    phone: isEditing ? provider?.phone : '',
    isPinned: isEditing ? provider?.isPinned : false,
  };

  const fetchProviderList = useFetchProviderListe();

  const handleSubmit = async (value: FormikValues | ProviderDTO) => {
    try {
      let newfourniseur = value;
      if (selectedPicture?.length > 0) {
        const { files } = await dispatch(
          postFile({
            file: selectedPicture,
          })
        ).unwrap();
        newfourniseur.logo = files[0].url;
      }
      if (isEditing) {
        await dispatch(
          updateProvider({
            id: provider.id as string,
            provider: {
              companyName: value.companyName,
              reference: value.reference,
              address: value.address,
              webSite: value.webSite,
              phone: value.phone,
              logo: value.logo,
            },
          })
        );
      } else {
        await dispatch(createProvider(value as ProviderDTO));
      }
      fetchProviderList();
      setSelectedPicture('');
    } catch (e) {
      /** show error here */
    }
  };
  return (
    <Formik
      enableReinitialize
      initialValues={isEditing ? provider : initialValues}
      validationSchema={Yup.object({
        reference: Yup.string().required('Champ obligatoire'),
        companyName: Yup.string().required('Champ obligatoire'),
        address: Yup.string().required('Champ obligatoire'),
        webSite: Yup.string().required('Champ obligatoire'),
        phone: Yup.string().required('Champ obligatoire'),
        // logo: Yup.string().required('obligatoire'),
      })}
      onSubmit={async (value: FormikValues, action) => {
        try {
          await handleSubmit(value);
          action.resetForm({ values: initialValues });
          dispatch(cancelEditArticle());
          setSelectedPicture('');
        } catch (error) {
          // TODO with error
        }
      }}
    >
      {(formikProps) => (
        <Form>
          <div className="bg-white h-full pb-2.5 w-full">
            <PageTitle
              title1="Gestion fournisseur"
              title2={'Ajout | Modification'}
            />

            <div className="h-[calc(100%_-_58px)]">
              <div className="p-2.5 flex w-full">
                <ProviderForm
                  selectedPicture={selectedPicture}
                  setSelectedPicture={setSelectedPicture}
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
                    dispatch(cancelEditProvider());
                    setSelectedPicture('');
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

              <ProviderTable />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
