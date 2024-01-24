import KeyboardDoubleArrowRight from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useConfirm } from 'material-ui-confirm';
import React from 'react';
import { enqueueSnackbar } from 'services/redux/notification/notificationSlice';

import {
  createBoxParams,
  getBoxParams,
  updateBoxParams,
} from 'services/redux/boxParams';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import AvalaibleBoxTable from './AvalaibleBoxTable';
import BoxParamsTable from './BoxParamsTable';
import useFetchBoxParamsList from './hooks/useFetchBoxParamsList';
import { MuiIconButton } from './styles';

export default function BestSellingBox() {
  const dispatch = useAppDispatch();
  const confirm = useConfirm();

  const fetchBestSellingBox = useFetchBoxParamsList({
    isBestSelling: true,
  });

  const { boxParamsList, boxParams, reloadBoxParams } = useAppSelector(
    (state) => state.boxParams
  );

  const [selectedAvalaibleBox, setSelectedAvalaibleBox] = React.useState<
    readonly string[]
  >([]);

  async function createBestSellingBox() {
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
                existingBoxParams.isBestSelling === true
              ) {
                dispatch(
                  enqueueSnackbar({
                    message: `Le box séléctionné est déjà dans la liste de box le plus vendu "${existingBoxParams?.box?.name}"`,
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
                      isBestSelling: true,
                    },
                  })
                );
              }
            } else if (res.payload.length === 0) {
              await dispatch(
                createBoxParams({
                  boxId: boxId,
                  isBestSelling: true,
                })
              );
            }
          })
          .catch(() => {
            dispatch(
              enqueueSnackbar({
                message:
                  "Erreur lors de l'ajout du box dans la liste des box le plus vendu",
                options: {
                  variant: 'success',
                },
              })
            );
          })
          .finally(() => {
            fetchBestSellingBox();
            setSelectedAvalaibleBox([]);
          });
      }
    }
  }

  const handleclickDelete = async (id: string) => {
    confirm({
      title: 'Supprimer',
      description:
        'Voulez-vous supprimer ce box dans la liste de box le plus vendu?',
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
              isBestSelling: false,
            },
          })
        );
      }
      fetchBestSellingBox();
    });
  };

  React.useEffect(() => {
    fetchBestSellingBox();
  }, [reloadBoxParams]);

  return (
    <div className="bg-white h-full pb-2.5 w-full">
      <div className="flex bg-gray-100 gap-3 w-full h-full pt-2.5">
        <AvalaibleBoxTable
          selected={selectedAvalaibleBox}
          setSelected={setSelectedAvalaibleBox}
        />

        <div className="flex flex-col items-center justify-center gap-2.5 h-auto">
          <MuiIconButton size="small" onClick={() => createBestSellingBox()}>
            <KeyboardDoubleArrowRight />
          </MuiIconButton>
        </div>

        <BoxParamsTable
          boxParamsList={boxParamsList}
          handleClickDelete={handleclickDelete}
          title="Box le plus vendu"
        />
      </div>
    </div>
  );
}
