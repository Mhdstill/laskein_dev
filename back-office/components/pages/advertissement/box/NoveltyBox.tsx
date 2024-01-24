import KeyboardDoubleArrowRight from '@mui/icons-material/KeyboardDoubleArrowRight';

import { useConfirm } from 'material-ui-confirm';
import React from 'react';
import {
  createBoxParams,
  getBoxParams,
  updateBoxParams,
} from 'services/redux/boxParams';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { enqueueSnackbar } from 'services/redux/notification/notificationSlice';
import AvalaibleBoxTable from './AvalaibleBoxTable';
import BoxParamsTable from './BoxParamsTable';
import useFetchBoxParamsList from './hooks/useFetchBoxParamsList';
import { MuiIconButton } from './styles';

export default function NoveltyBox() {
  const dispatch = useAppDispatch();
  const confirm = useConfirm();

  const fetchNoveltyBox = useFetchBoxParamsList({
    isNew: true,
  });

  const { boxParamsList, boxParams, reloadBoxParams } = useAppSelector(
    (state) => state.boxParams
  );

  const [selectedAvalaibleBox, setSelectedAvalaibleBox] = React.useState<
    readonly string[]
  >([]);

  async function createNoveltyBox() {
    if (selectedAvalaibleBox) {
      for (const boxId of selectedAvalaibleBox) {
        // check if box params exist yet, update it
        dispatch(
          getBoxParams({
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
              const existingBoxParams = res.payload[0];
              if (
                existingBoxParams.boxId === boxId &&
                existingBoxParams.isNew === true
              ) {
                dispatch(
                  enqueueSnackbar({
                    message: `Le box séléctionné est déjà dans la liste de boxs nouveautés "${existingBoxParams?.box?.name}"`,
                    options: {
                      variant: 'warning',
                    },
                  })
                );
              } else {
                await dispatch(
                  updateBoxParams({
                    id: existingBoxParams.id as string,
                    boxParams: {
                      boxId: existingBoxParams.boxId,
                      isNew: true,
                    },
                  })
                );
              }
            } else if (res.payload.length === 0) {
              await dispatch(
                createBoxParams({
                  boxId: boxId,
                  isNew: true,
                })
              );
            }
          })
          .catch(() => {
            dispatch(
              enqueueSnackbar({
                message:
                  "Erreur lors de l'ajout du box dans la liste des boxs nouveautés",
                options: {
                  variant: 'success',
                },
              })
            );
          })
          .finally(() => {
            fetchNoveltyBox();
            setSelectedAvalaibleBox([]);
          });
      }
    }
  }

  const handleclickDelete = async (id: string) => {
    confirm({
      title: 'Supprimer',
      description:
        'Voulez-vous supprimer ce box dans la liste de boxs nouveautés?',
      cancellationText: 'Annuler',
      confirmationText: 'Supprimer',
      cancellationButtonProps: {
        color: 'warning',
      },
      confirmationButtonProps: {
        color: 'error',
      },
    }).then(async () => {
      const res = await dispatch(getBoxParams({ id: id }));
      if (res) {
        await dispatch(
          updateBoxParams({
            id: id,
            boxParams: {
              boxId: boxParams.boxId,
              isNew: false,
            },
          })
        );
      }
      fetchNoveltyBox();
    });
  };

  React.useEffect(() => {
    fetchNoveltyBox();
  }, [reloadBoxParams]);

  return (
    <div className="bg-white h-full pb-2.5 w-full">
      <div className="flex bg-gray-100 gap-3 w-full h-full pt-2.5">
        <AvalaibleBoxTable
          selected={selectedAvalaibleBox}
          setSelected={setSelectedAvalaibleBox}
        />

        <div className="flex flex-col items-center justify-center gap-2.5 h-auto">
          <MuiIconButton size="small" onClick={() => createNoveltyBox()}>
            <KeyboardDoubleArrowRight />
          </MuiIconButton>
        </div>

        <BoxParamsTable
          boxParamsList={boxParamsList}
          handleClickDelete={handleclickDelete}
          title="Box nouveautés"
        />
      </div>
    </div>
  );
}