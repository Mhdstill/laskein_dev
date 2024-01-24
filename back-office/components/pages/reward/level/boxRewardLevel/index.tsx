import { KeyboardDoubleArrowRight } from '@mui/icons-material';
import Undo from '@mui/icons-material/Undo';
import AvalaibleBoxTable from 'components/pages/advertissement/box/AvalaibleBoxTable';
import { useRouter } from 'next/router';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { enqueueSnackbar } from 'services/redux/notification/notificationSlice';
import {
  createBoxRewardLevel,
  getBoxRewardLevel,
} from 'services/redux/reward/boxRewardLevel';
import { cancelEditBoxRewardLevel } from 'services/redux/reward/boxRewardLevel/boxRewardLevelSlice';
import { setActiveUi } from 'services/redux/reward/level/rewardLevelSlice';
import { MuiContainedButton, MuiIconButton } from '../styles';
import BoxRewardLevelTable from './table';
import useFetchBoxRewardLevelList from './useFetchBoxRewardLevel';

export default function BoxRewardLevel() {
  const dispatch = useAppDispatch();

  const router = useRouter();
  const { rewardLevelId } = router.query;

  const { boxRewardLevelList, loading } = useAppSelector(
    (state) => state.boxRewardLevel
  );

  const { rewardLevel } = useAppSelector((state) => state.rewardLevel);

  const [selectedAvalaibleBox, setSelectedAvalaibleBox] = React.useState<
    readonly string[]
  >([]);

  const fetchBoxRewardLevelList = useFetchBoxRewardLevelList();

  async function handleCreateBoxRewardLevel() {
    if (selectedAvalaibleBox) {
      for (const boxId of selectedAvalaibleBox) {
        // check if box params exist yet, update it
        dispatch(
          getBoxRewardLevel({
            id: '',
            args: {
              where: {
                boxId: boxId,
                rewardLevelId: rewardLevel.id as string,
              },
            },
          })
        )
          .then(async (res) => {
            if (res.payload && res.payload.length > 0) {
              const existingBoxRewardLevel = res.payload[0];
              if (existingBoxRewardLevel) {
                dispatch(
                  enqueueSnackbar({
                    message: `Le box séléctionné est déjà dans ce pallier de récompense ${rewardLevel?.name}`,
                    options: {
                      variant: 'warning',
                    },
                  })
                );
              }
            } else if (res.payload.length === 0) {
              const res = await dispatch(
                createBoxRewardLevel({
                  boxId: boxId,
                  rewardLevelId: rewardLevel.id as string,
                })
              );
              if (res) {
                dispatch(
                  enqueueSnackbar({
                    message: `Box ajouté dans le pallier de récompense ${rewardLevel?.name}`,
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
                  "Erreur lors de l'ajout du box dans ce pallier de récompense",
                options: {
                  variant: 'success',
                },
              })
            );
          })
          .finally(() => {
            fetchBoxRewardLevelList();
            setSelectedAvalaibleBox([]);
          });
      }
    }
  }

  React.useEffect(() => {
    fetchBoxRewardLevelList();
  }, [router.query, rewardLevelId]);

  return (
    <div className="bg-white h-full pb-2.5 w-full">
      <div className="flex w-full justify-end px-2.5 py-1">
        <MuiContainedButton
          variant="contained"
          color="primary"
          startIcon={<Undo />}
          className="!normal-case bg-[#376F70] text-white"
          sx={{
            background: '#376F70',
          }}
          onClick={() => {
            dispatch(setActiveUi('list'));
            dispatch(cancelEditBoxRewardLevel());
            router.push('/reward');
          }}
        >
          Retour
        </MuiContainedButton>
      </div>

      <div className="flex bg-gray-100 gap-3 w-full h-full pt-2.5">
        <AvalaibleBoxTable
          selected={selectedAvalaibleBox}
          setSelected={setSelectedAvalaibleBox}
        />

        <div className="flex flex-col items-center justify-center gap-2.5 h-auto">
          <MuiIconButton
            size="small"
            onClick={() => handleCreateBoxRewardLevel()}
          >
            <KeyboardDoubleArrowRight />
          </MuiIconButton>
        </div>

        <BoxRewardLevelTable
          boxRewardLevelList={boxRewardLevelList}
          title="Box dans le pallier de récompense"
          loading={loading}
        />
      </div>
    </div>
  );
}
