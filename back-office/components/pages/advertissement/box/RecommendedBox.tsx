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

export default function RecommendedBox() {
  const dispatch = useAppDispatch();
  const confirm = useConfirm();

  const fetchRecommandedBox = useFetchBoxParamsList({
    isRecommended: true,
  });

  const { boxParamsList, boxParams, reloadBoxParams } = useAppSelector(
    (state) => state.boxParams
  );

  const [selectedAvalaibleBox, setSelectedAvalaibleBox] = React.useState<
    readonly string[]
  >([]);

  async function createRecommandedBox() {
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
                existingBoxParams.isRecommended === true
              ) {
                dispatch(
                  enqueueSnackbar({
                    message: `Le box séléctionné est déjà dans la liste des box récommandés ${existingBoxParams?.box?.name}`,
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
                      isRecommended: true,
                    },
                  })
                );
              }
            } else if (res.payload.length === 0) {
              await dispatch(
                createBoxParams({
                  boxId: boxId,
                  isRecommended: true,
                })
              );
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
            fetchRecommandedBox();
            setSelectedAvalaibleBox([]);
          });
      }
    }
  }

  const handleclickDelete = async (id: string) => {
    confirm({
      title: 'Supprimer',
      description:
        'Voulez-vous supprimer ce box dans la liste des box recommandés?',
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
              isRecommended: false,
            },
          })
        );
      }
      fetchRecommandedBox();
    });
  };

  React.useEffect(() => {
    fetchRecommandedBox();
  }, [reloadBoxParams]);

  return (
    <div className="bg-white h-full pb-2.5 w-full">
      <div className="flex bg-gray-100 gap-3 w-full h-full pt-2.5">
        <AvalaibleBoxTable
          selected={selectedAvalaibleBox}
          setSelected={setSelectedAvalaibleBox}
        />

        <div className="flex flex-col items-center justify-center gap-2.5 h-auto">
          <MuiIconButton size="small" onClick={() => createRecommandedBox()}>
            <KeyboardDoubleArrowRight />
          </MuiIconButton>
        </div>

        <BoxParamsTable
          boxParamsList={boxParamsList}
          handleClickDelete={handleclickDelete}
          title="Box récommandé"
        />
      </div>
    </div>
  );
}
