import CloseRounded from '@mui/icons-material/CloseRounded';
import Save from '@mui/icons-material/Save';
import { Form, Formik } from 'formik';
import { useEffect } from 'react';
import * as Yup from 'yup';

import OSTextField from 'components/shared/input/OSTextField';
import RewardLevelDTO from 'data/dto/RewardLevel.dto';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { enqueueSnackbar } from 'services/redux/notification/notificationSlice';
import {
  createRewardLevel,
  updateRewardLevel,
} from 'services/redux/reward/level';
import {
  cancelEditRewardLevel,
  setActiveUi,
} from 'services/redux/reward/level/rewardLevelSlice';
import useFetchRewardLevelList from './hooks/useFetchRewardLevelList';
import { MuiContainedButton } from './styles';

export default function RewardLevelForm() {
  const { isEditing, rewardLevel } = useAppSelector(
    (state) => state.rewardLevel
  );

  const fetchRewardLevel = useFetchRewardLevelList();

  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchRewardLevel();
  }, [dispatch]);

  const initialValues: RewardLevelDTO = {
    orderNumber: isEditing ? rewardLevel.orderNumber : 0,
    name: isEditing ? rewardLevel.name : '',
    unlockThreshold: isEditing ? rewardLevel.unlockThreshold : 0,
    description: isEditing ? rewardLevel.description : '',
  };

  const handleSubmit = async (value: RewardLevelDTO) => {
    try {
      if (isEditing) {
        const res = await dispatch(
          updateRewardLevel({
            id: rewardLevel.id as string,
            rewardLevel: {
              orderNumber: value.orderNumber,
              name: value.name,
              unlockThreshold: value.unlockThreshold,
              description: value.description,
            },
          })
        );
        if (res) {
          dispatch(
            enqueueSnackbar({
              message: 'Pallier de récompense mis à jour avec succès',
              options: {
                variant: 'success',
              },
            })
          );
        }
      } else {
        const res = await dispatch(
          createRewardLevel({
            orderNumber: value.orderNumber,
            name: value.name,
            unlockThreshold: value.unlockThreshold,
            description: value.description,
          })
        );
        if (res) {
          dispatch(
            enqueueSnackbar({
              message: 'Pallier de récompense créé avec succès',
              options: {
                variant: 'success',
              },
            })
          );
        }
      }
      fetchRewardLevel();
    } catch (error) {
      dispatch(
        enqueueSnackbar({
          message: 'Une erreur a été rencontré',
          options: {
            variant: 'error',
          },
        })
      );
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={isEditing ? rewardLevel : initialValues}
      validationSchema={Yup.object({
        orderNumber: Yup.number().required('Champ obligatoire'),
        name: Yup.string().required('Champ obligatoire'),
        unlockThreshold: Yup.number(),
        description: Yup.string(),
      })}
      onSubmit={async (value: RewardLevelDTO, action) => {
        await handleSubmit(value);
        action.resetForm({ values: initialValues });
        dispatch(cancelEditRewardLevel());
        dispatch(setActiveUi('list'));
      }}
    >
      {(formikProps) => (
        <Form>
          <div className="bg-white h-full pb-2.5 w-full">
            <div className="h-[calc(100%_-_58px)]">
              <div className="flex flex-col sm:items-center w-full mb-2.5">
                <div className="h-full p-2.5 w-full flex flex-col gap-2.5">
                  <OSTextField
                    name="orderNumber"
                    size="small"
                    label="Numéro"
                    type="number"
                  />
                  <OSTextField name="name" size="small" label="Nom" />
                </div>
                <div className="h-full p-2.5 w-full flex flex-col gap-2.5">
                  <OSTextField
                    name="unlockThreshold"
                    size="small"
                    label="Seuil de déblocage"
                    type="number"
                  />
                  <OSTextField
                    name="description"
                    size="small"
                    label="Description"
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
                    dispatch(cancelEditRewardLevel());
                    dispatch(setActiveUi('list'));
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
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
