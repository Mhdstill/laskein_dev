import KeyboardDoubleArrowRight from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useConfirm } from 'material-ui-confirm';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { enqueueSnackbar } from 'services/redux/notification/notificationSlice';

import AvalaibleBoxTable from 'components/pages/advertissement/box/AvalaibleBoxTable';
import {
  createDailyReward,
  deleteDailyReward,
  getDailyReward,
} from 'services/redux/reward/daily';
import DailyRewardBoxTable from './DailyRewardBoxTable';
import useFetchDailyRewardList from './hooks/useFetchDailyReward';
import { MuiIconButton } from './styles';

export default function DailyReward() {
  const dispatch = useAppDispatch();
  const confirm = useConfirm();

  const fetchDailyRewardList = useFetchDailyRewardList();

  const { dailyRewardList, reloadDailyReward } = useAppSelector(
    (state) => state.dailyReward
  );

  const [selectedAvalaibleBox, setSelectedAvalaibleBox] = React.useState<
    readonly string[]
  >([]);

  const [missingValues, setMissingValues] = React.useState<number[]>([]);

  async function createDailyRewardBox() {
    if (selectedAvalaibleBox) {
      for (const boxId of selectedAvalaibleBox) {
        // check if box params exist yet, update it
        dispatch(
          getDailyReward({
            id: '',
            args: {
              where: {
                boxId: boxId,
              },
              include: {
                box: true,
              },
            },
          })
        )
          .then(async (res) => {
            if (res.payload && res.payload.length > 0) {
              const existingDailyRewardBox = res.payload[0];
              if (existingDailyRewardBox) {
                dispatch(
                  enqueueSnackbar({
                    message: `Le box séléctionné est déjà dans la liste des box récompense journalière ${existingDailyRewardBox?.box?.name}`,
                    options: {
                      variant: 'warning',
                    },
                  })
                );
              }
            } else if (res.payload.length === 0) {
              const res = await dispatch(
                createDailyReward({
                  boxId: boxId,
                  number: missingValues[0],
                })
              );
              if (res) {
                dispatch(
                  enqueueSnackbar({
                    message: `Box ajouté dans la liste des récompenses journalières: Jour-${missingValues[0]}`,
                    options: {
                      variant: 'success',
                    },
                  })
                );
              }
            }
          })
          .catch(() => {
            dispatch(
              enqueueSnackbar({
                message:
                  "Erreur lors de l'ajout du box dans la liste des box recommandés",
                options: {
                  variant: 'success',
                },
              })
            );
          })
          .finally(() => {
            fetchDailyRewardList();
            setSelectedAvalaibleBox([]);
          });
      }
    }
  }

  const handleclickDelete = async (id: string) => {
    confirm({
      title: 'Supprimer',
      description:
        'Voulez-vous supprimer ce box dans liste de récompense journalière?',
      cancellationText: 'Annuler',
      confirmationText: 'Supprimer',
      cancellationButtonProps: {
        color: 'warning',
      },
      confirmationButtonProps: {
        color: 'error',
      },
    })
      .then(async () => {
        const res = await dispatch(
          deleteDailyReward({
            id: id,
          })
        );
        if (res) {
          dispatch(
            enqueueSnackbar({
              message: `Box supprimé dans la liste des récompenses journalières`,
              options: {
                variant: 'success',
              },
            })
          );
        }
        fetchDailyRewardList();
      })
      .catch(() => {
        dispatch(
          enqueueSnackbar({
            message: `Erreur: Box non supprimé dans la liste des récompenses journalières`,
            options: {
              variant: 'error',
            },
          })
        );
      });
  };

  React.useEffect(() => {
    fetchDailyRewardList();
  }, [reloadDailyReward]);

  return (
    <div className="bg-white h-full pb-2.5 w-full">
      <div className="flex bg-gray-100 gap-3 w-full h-full pt-2.5">
        <AvalaibleBoxTable
          selected={selectedAvalaibleBox}
          setSelected={setSelectedAvalaibleBox}
        />

        <div className="flex flex-col items-center justify-center gap-2.5 h-auto">
          {dailyRewardList.length < 28 && (
            <MuiIconButton size="small" onClick={() => createDailyRewardBox()}>
              <KeyboardDoubleArrowRight />
            </MuiIconButton>
          )}
        </div>

        <DailyRewardBoxTable
          dailyRewardList={dailyRewardList}
          handleClickDelete={handleclickDelete}
          title="Récompense journalière"
          missingValues={missingValues}
          setMissingValues={setMissingValues}
        />
      </div>
    </div>
  );
}
