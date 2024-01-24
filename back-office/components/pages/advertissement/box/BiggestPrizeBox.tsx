import KeyboardDoubleArrowRight from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useConfirm } from 'material-ui-confirm';
import React from 'react';

import Delete from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SelectePicture from 'components/pages/box/_/SelectePicture';
import KeyValue from 'components/shared/KeyValue';
import BoxDTO from 'data/dto/Box.dto';
import { Form, Formik, FormikValues } from 'formik';
import { createBoxImage, updateBoxImage } from 'services/redux/box/box-image';
import { cancelEditBox } from 'services/redux/box/boxSlice';
import { editBox } from 'services/redux/box/useCase/edit';
import { getBox } from 'services/redux/box/useCase/get';
import { updateBox } from 'services/redux/box/useCase/update';
import {
  createBoxParams,
  getBoxParams,
  updateBoxParams,
} from 'services/redux/boxParams';
import { postFile } from 'services/redux/file/useCase/postFile';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { enqueueSnackbar } from 'services/redux/notification/notificationSlice';
import AvalaibleBoxTable from './AvalaibleBoxTable';
import useFetchBoxParamsList from './hooks/useFetchBoxParamsList';
import { MuiIconButton } from './styles';

export default function BiggestPrizeBox() {
  const dispatch = useAppDispatch();
  const confirm = useConfirm();

  const fetchBiggestPrize = useFetchBoxParamsList(
    {
      isBigPrice: true,
    },
    { img: true }
  );

  const { boxParamsList, boxParams, loading, reloadBoxParams } = useAppSelector(
    (state) => state.boxParams
  );

  const { box } = useAppSelector((state) => state.box);

  const [selectedAvalaibleBox, setSelectedAvalaibleBox] = React.useState<
    readonly string[]
  >([]);

  async function createBiggestPrize() {
    // remove existing box params => it must exist only one box
    if (boxParamsList.length > 0) {
      for (const boxParams of boxParamsList) {
        await dispatch(
          updateBoxParams({
            id: boxParams.id as string,
            boxParams: {
              boxId: boxParams.boxId,
              isBigPrice: false,
            },
          })
        );
      }
    }
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
                existingBoxParams.isBigPrice === true
              ) {
                dispatch(
                  enqueueSnackbar({
                    message: `Le box séléctionné est déjà dans la liste de boxs gros lot "${existingBoxParams?.box?.name}"`,
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
                      isBigPrice: true,
                    },
                  })
                );
              }
            } else if (res.payload.length === 0) {
              await dispatch(
                createBoxParams({
                  boxId: boxId,
                  isBigPrice: true,
                })
              );
            }
          })
          .catch(() => {
            dispatch(
              enqueueSnackbar({
                message:
                  "Erreur lors de l'ajout du box dans la liste des boxs gros lot",
                options: {
                  variant: 'success',
                },
              })
            );
          })
          .finally(() => {
            fetchBiggestPrize();
            setSelectedAvalaibleBox([]);
          });
      }
    }
  }

  const handleclickDelete = async (id: string) => {
    confirm({
      title: 'Supprimer',
      description:
        'Voulez-vous supprimer ce box dans la liste de boxs gros lot?',
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
              isBigPrice: false,
            },
          })
        );
      }
      fetchBiggestPrize();
    });
  };

  React.useEffect(() => {
    if (boxParamsList.length > 0) {
      getBoxInsideBoxParams();
    }
  }, [boxParamsList, reloadBoxParams]);

  async function getBoxInsideBoxParams() {
    if (boxParamsList.length > 0) {
      const res = await dispatch(
        getBox({
          id: boxParamsList[0]?.boxId,
          args: { include: { boxImage: true } },
        })
      );
      if (res) {
        dispatch(
          editBox({
            id: boxParamsList[0]?.boxId as string,
            args: { include: { boxImage: true } },
          })
        );
      }
    }
  }

  React.useEffect(() => {
    fetchBiggestPrize();
  }, [reloadBoxParams]);

  const [otherPicture, setOtherPicture] = React.useState<string | ArrayBuffer>(
    ''
  );

  async function updatePictureInsideBox(
    selectedPic: string | ArrayBuffer,
    status: string
  ) {
    if (selectedPic) {
      const { files } = await uploadFile(selectedPic as string);
      if (files && files.length > 0) {
        await updateBoxImg(files[0].url, status);
      }
    }
  }

  async function uploadFile(metadata: string) {
    const res = await dispatch(
      postFile({
        file: metadata,
      })
    ).unwrap();
    return res;
  }

  async function updateBoxImg(photoUrl: string, status: string) {
    if (box?.boxImage && box.boxImage.length > 0) {
      // check if box status exist, if yes => update it else, create new
      let res: any;
      const currentBoxImage = box.boxImage.find(
        (item) => item.status === status
      );
      if (currentBoxImage) {
        res = await dispatch(
          updateBoxImage({
            id: currentBoxImage.id as string,
            boxImage: {
              boxId: box?.id,
              photoUrl: photoUrl,
              status: status,
            },
          })
        );
      } else {
        res = await createBoxImg(box?.id!, photoUrl, status);
      }
      if (res) {
        await dispatch(
          getBox({
            id: box?.id as string,
            args: {
              include: { boxImage: true },
            },
          })
        );
      }
    } else {
      await createBoxImg(box?.id!, photoUrl, status);
    }
  }

  async function createBoxImg(boxId: string, photoUrl: string, status: string) {
    await dispatch(
      createBoxImage({
        boxId: boxId,
        photoUrl: photoUrl,
        status: status,
      })
    ).unwrap();
  }

  const initialValues: FormikValues = {
    reference: box?.reference,
    name: box?.name,
    boxTypeId: box?.boxTypeId,
    price: box?.price,
    number: box?.number,
    badge: box?.badge,
    description: box?.description,
  };

  const handleSubmit = async (value: FormikValues | BoxDTO) => {
    try {
      // updading box store result in res
      const res = await dispatch(
        updateBox({
          id: box!.id as string,
          box: {
            reference: value.reference,
            name: value.name,
            boxTypeId: value.boxTypeId,
            price: value.price,
            number: value.number,
            badge: value.badge,
            description: value.description,
          },
        })
      );
      // upload new photo if changed => check the box if photo is to change or to uploading for first time
      if (res) {
        await updatePictureInsideBox(otherPicture, 'OTHER');
        setOtherPicture('');
      }
      getBoxInsideBoxParams();
    } catch (e) {
      /** show error here */
    }
  };

  return (
    <div className="bg-white h-full pb-2.5 w-full">
      <div className="flex bg-gray-100 gap-3 w-full h-full pt-2.5">
        <AvalaibleBoxTable
          selected={selectedAvalaibleBox}
          setSelected={setSelectedAvalaibleBox}
          isMultiple={false}
        />
        <div className="flex flex-col items-center justify-center gap-2.5 h-auto">
          <MuiIconButton size="small" onClick={() => createBiggestPrize()}>
            <KeyboardDoubleArrowRight />
          </MuiIconButton>
        </div>
        {boxParamsList.length > 0 && boxParamsList[0]?.box && (
          <div className="flex flex-col p-3 w-1/2 h-full bg-white gap-2">
            <Formik
              initialValues={initialValues}
              onSubmit={async (value: FormikValues, action) => {
                await handleSubmit(value);
                action.resetForm({ values: initialValues });
                dispatch(cancelEditBox());
              }}
            >
              {() => (
                <Form>
                  <div className="flex flex-col p-3 w-full h-full bg-white gap-2">
                    <div className="flex justify-between items-center">
                      <p>Box gros lot</p>
                      <div className="flex items-center">
                        <Button variant="text" type="submit">
                          Enregistrer
                        </Button>
                        {boxParamsList.length > 0 && (
                          <IconButton
                            onClick={() =>
                              handleclickDelete(boxParamsList[0]?.id!)
                            }
                            size="small"
                            color="error"
                            className="text-red-500"
                          >
                            <Delete />
                          </IconButton>
                        )}
                      </div>
                    </div>
                    {loading && (
                      <div className="flex h-[200px] w-full">
                        Chargement ...
                      </div>
                    )}
                    {!box && (
                      <p className="text-base">Pas de box gros lot choisit</p>
                    )}
                    {!loading && box && (
                      <div className="flex flex-col w-full h-full">
                        <div className="px-2">
                          <KeyValue title="Référence" value={box?.reference} />
                          <KeyValue title="Nom" value={box?.name} />
                        </div>
                        <SelectePicture
                          status="OTHER"
                          isEditable
                          selectedPicture={otherPicture}
                          setSelectedPicture={setOtherPicture}
                        />
                      </div>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </div>
  );
}
