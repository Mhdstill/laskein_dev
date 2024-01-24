import { Close, CloseRounded, Save } from '@mui/icons-material';
import {
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import OSCheckbox from 'components/shared/checkSwitch/OSCheckSwitch';
import OSTextField from 'components/shared/input/OSTextField';
import OfferDTO from 'data/dto/Offer.dto';
import { Form, Formik } from 'formik';
import { createOffer, updateOffer } from 'services/redux/abonnement/offer';
import { cancelEditOffer } from 'services/redux/abonnement/offer/modelsSlice';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import * as Yup from 'yup';
import useFetchOfferListe from './hooks/useFetchOfferList';
import { MuiContainedButton } from './styles';

type OfferProps = {
  // offerData: OfferDTO;
  handleClose: any;
};

export default function OfferForm({ handleClose }: OfferProps) {
  const { isEditing, offer } = useAppSelector((state) => state.offer);
  const dispatch = useAppDispatch();

  const fetchOfferList = useFetchOfferListe();

  const handleSubmit = async (value: OfferDTO) => {
    try {
      value.price = +value.price;
      value.priceThreeMonth = +value.priceThreeMonth;
      value.numberMysteryBoxBronze = +value.numberMysteryBoxBronze;
      value.numberMysteryBoxSylver = +value.numberMysteryBoxSylver;
      value.numberMysteryBoxGold = +value.numberMysteryBoxGold;
      value.duration = +value.duration;
      if (isEditing) {
        await dispatch(
          updateOffer({
            id: offer.id as string,
            offer: {
              name: value.name,
              price: value.price,
              priceThreeMonth: value.priceThreeMonth,
              color: value.color,
              numberMysteryBoxBronze: value.numberMysteryBoxBronze,
              numberMysteryBoxSylver: value.numberMysteryBoxSylver,
              numberMysteryBoxGold: value.numberMysteryBoxGold,
              isAwardLevelActive: value.isAwardLevelActive,
              isWeeklyAwardActive: value.isWeeklyAwardActive,
              isStandardSupportActive: value.isStandardSupportActive,
              isVIPSupportActive: value.isVIPSupportActive,
              duration: value.duration,
            },
          })
        );
      } else {
        await dispatch(createOffer(value));
      }
      fetchOfferList();
    } catch (e) {
      /** show error here */
    }
  };

  return (
    <Box>
      <Formik
        enableReinitialize
        initialValues={
          isEditing
            ? offer
            : {
                name: '',
                price: '',
                color: '',
                priceThreeMonth: '',
                numberMysteryBoxBronze: '',
                numberMysteryBoxSylver: '',
                numberMysteryBoxGold: '',
                isAwardLevelActive: false,
                isWeeklyAwardActive: false,
                isStandardSupportActive: false,
                isVIPSupportActive: false,
                duration: '',
              }
        }
        validationSchema={Yup.object({
          name: Yup.string().required('Champ obligatoire'),
          price: Yup.number().required('Champ obligatoire'),
          // color: Yup.string().required('Champ obligatoire'),
          numberMysteryBoxBronze: Yup.number().required('Champ obligatoire'),
          numberMysteryBoxSylver: Yup.number().required('Champ obligatoire'),
          numberMysteryBoxGold: Yup.number().required('Champ obligatoire'),
          // duration: Yup.number().required('Champ obligatoire'),
          // isAwardLevelActive: Yup.boolean().required('Champ obligatoire'),
          // isWeeklyAwardActive: Yup.boolean().required('Champ obligatoire'),
          // isStandardSupportActive: Yup.boolean().required('Champ obligatoire'),
          // isVIPSupportActive: Yup.boolean().required('Champ obligatoire'),
        })}
        onSubmit={(value: any, action: any) => {
          handleSubmit(value);
          action.resetForm();
          // console.log('valeur', value);
        }}
      >
        {(formikProps) => {
          return (
            <Form>
              <DialogTitle id="alert-dialog-title">
                <div className="w-full flex items-center justify-between">
                  <Typography variant="h5" color="primary">
                    Créer un offre d&apos;abonnement
                  </Typography>
                  <MuiContainedButton
                    startIcon={<Close />}
                    variant="contained"
                    color="warning"
                    onClick={handleClose}
                    className="bg-orange-400 text-white "
                  >
                    Fermer
                  </MuiContainedButton>
                </div>
              </DialogTitle>
              <DialogContent>
                <div className="h-full flex flex-col gap-3 px-6 pb-4 pt-4">
                  <div className="h-full w-full flex gap-2.5">
                    <OSTextField name="name" size="small" label="Nom" />
                    <OSTextField
                      name="price"
                      size="small"
                      label="Prix"
                      type="number"
                    />
                    <OSTextField
                      name="priceThreeMonth"
                      size="small"
                      label="Prix pour 3 mois"
                      type="number"
                    />
                  </div>
                  <div className="h-full w-full flex gap-2.5">
                    <OSTextField name="color" size="small" label="coleur" />
                    <OSTextField
                      name="numberMysteryBoxBronze"
                      size="small"
                      label="Nombre Coffre mystère Bronze"
                      type="number"
                    />

                    <OSTextField
                      name="numberMysteryBoxSylver"
                      size="small"
                      label="Nombre Coffre mystère Argent"
                      type="number"
                    />
                  </div>
                  <div className="h-full w-full flex gap-2.5 ">
                    <OSTextField
                      name="numberMysteryBoxGold"
                      size="small"
                      label="Nombre Coffre mystère Or"
                      type="number"
                    />
                    <OSTextField
                      name="duration"
                      size="small"
                      label="Duration"
                      type="number"
                    />
                    <FormControl fullWidth>
                      <FormControlLabel
                        control={
                          <OSCheckbox
                            name="isAwardLevelActive"
                            checked={true}
                          />
                        }
                        label="Pallier de récompense"
                      />
                    </FormControl>
                  </div>
                  <div className="h-full w-full flex gap-2.5">
                    <FormControl fullWidth>
                      <FormControlLabel
                        control={
                          <OSCheckbox
                            name="isWeeklyAwardActive"
                            checked={true}
                          />
                        }
                        label="Récompense hebdomadaire"
                      />
                    </FormControl>
                    <FormControl fullWidth>
                      <FormControlLabel
                        control={
                          <OSCheckbox
                            name="isStandardSupportActive"
                            checked={true}
                          />
                        }
                        label="Support standard 24/7"
                      />
                    </FormControl>
                    <FormControl fullWidth>
                      <FormControlLabel
                        control={
                          <OSCheckbox
                            name="isVIPSupportActive"
                            checked={true}
                          />
                        }
                        label="Support VIP 24/7"
                      />
                    </FormControl>
                    {/* <FormControl fullWidth>
                      <FormControlLabel
                        control={<Checkbox name="isWeeklyAwardActive" />}
                        label="Récompense hebdomadaire"
                      />
                    </FormControl> */}
                  </div>
                </div>
              </DialogContent>
              <DialogActions>
                <div className="w-full flex gap-2.5 justify-end px-4">
                  <MuiContainedButton
                    variant="contained"
                    color="warning"
                    startIcon={<CloseRounded />}
                    onClick={() => {
                      formikProps.resetForm();
                      dispatch(cancelEditOffer());
                      handleClose();
                    }}
                    className="!bg-orange-500 !normal-case text-white"
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
                    onClick={handleClose}
                  >
                    Enregistrer
                  </MuiContainedButton>
                </div>
              </DialogActions>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
}
