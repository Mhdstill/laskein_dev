import CloseRounded from '@mui/icons-material/CloseRounded';
import Save from '@mui/icons-material/Save';
import { Form, Formik, FormikValues } from 'formik';
import React, { useEffect } from 'react';
import * as Yup from 'yup';

import { CircularProgress } from '@mui/material';
import OSTextField from 'components/shared/input/OSTextField';
import OSSelectField from 'components/shared/select/OSSelectField';
import BoxDTO from 'data/dto/Box.dto';
import { createBoxImage, updateBoxImage } from 'services/redux/box/box-image';
import { cancelEditBox, toggleForm } from 'services/redux/box/boxSlice';
import { getBoxTypeList } from 'services/redux/box/type';
import { createBox } from 'services/redux/box/useCase/create';
import { getBox } from 'services/redux/box/useCase/get';
import { updateBox } from 'services/redux/box/useCase/update';
import { postFile } from 'services/redux/file/useCase/postFile';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import SelectePicture from './SelectePicture';
import useFetchBoxList from './hooks/useFetchBoxList';
import { MuiContainedButton } from './styles';

const badges = [
  { id: 'SOLDE', desc: 'Solde' },
  { id: 'TENDANCE', desc: 'Tendance' },
];

export default function BoxForm() {
  const dispatch = useAppDispatch();

  const [openedPicture, setOpenedPicture] = React.useState<
    string | ArrayBuffer
  >('');
  const [closedPicture, setClosedPicture] = React.useState<
    string | ArrayBuffer
  >('');
  const [playingPicture, setPlayingPicture] = React.useState<
    string | ArrayBuffer
  >('');
  const [otherPicture, setOtherPicture] = React.useState<string | ArrayBuffer>(
    ''
  );

  const { boxTypeList } = useAppSelector((state) => state.boxType);
  const fetchBoxList = useFetchBoxList();

  useEffect(() => {
    fetchBoxList();
  }, []);

  React.useEffect(() => {
    dispatch(getBoxTypeList({}));
  }, [dispatch]);

  const { isEditing, box, loading } = useAppSelector((state) => state.box);

  const initialValues: FormikValues = {
    reference: isEditing ? box?.reference : '',
    name: isEditing ? box?.name : '',
    boxTypeId: isEditing ? box?.boxTypeId : '',
    price: isEditing ? box?.price : '',
    number: isEditing ? box?.number : '',
    badge: isEditing ? box?.badge : undefined,
    description: isEditing ? box?.description : '',
  };

  const handleSubmit = async (value: FormikValues | BoxDTO) => {
    try {
      value.price = +value.price;
      value.number = +value.number;
      if (isEditing) {
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
          await updatePictureInsideBox(openedPicture, 'OPENED');
          await updatePictureInsideBox(closedPicture, 'CLOSED');
          await updatePictureInsideBox(playingPicture, 'PLAYING');
          await updatePictureInsideBox(otherPicture, 'OTHER');
          setOpenedPicture('');
          setClosedPicture('');
          setPlayingPicture('');
          setOtherPicture('');
        }
      } else {
        // creating new box
        // if box is created => upload photo && if photo is uploaded => create new boxphoto
        const createdBox = await dispatch(createBox(value as BoxDTO)).unwrap();
        if (createdBox) {
          await createPictureInsideBox(
            createdBox.id as string,
            openedPicture,
            'OPENED'
          );
          await createPictureInsideBox(
            createdBox.id as string,
            closedPicture,
            'CLOSED'
          );
          await createPictureInsideBox(
            createdBox.id as string,
            playingPicture,
            'PLAYING'
          );
          await createPictureInsideBox(
            createdBox.id as string,
            otherPicture,
            'OTHER'
          );
          setOpenedPicture('');
          setClosedPicture('');
          setPlayingPicture('');
          setOtherPicture('');
        }
      }
      fetchBoxList();
    } catch (e) {
      /** show error here */
    }
  };

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

  async function createPictureInsideBox(
    boxId: string,
    selectedPic: string | ArrayBuffer,
    status: string
  ) {
    if (selectedPic) {
      const { files } = await uploadFile(selectedPic as string);
      if (files && files.length > 0) {
        await createBoxImg(boxId, files[0].url, status);
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

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        reference: Yup.string().required('Champ obligatoire'),
        name: Yup.string().required('Champ obligatoire'),
        price: Yup.number().required('Champ obligatoire'),
        number: Yup.number().required('Champ obligatoire'),
        boxTypeId: Yup.string().required('Champ obligatoire'),
        description: Yup.string().required('Champ obligatoire'),
      })}
      onSubmit={async (value: FormikValues, action) => {
        await handleSubmit(value);
        action.resetForm({ values: initialValues });
        dispatch(cancelEditBox());
        dispatch(toggleForm(false));
      }}
      enableReinitialize
    >
      {(formikProps) => (
        <Form>
          {loading ? (
            <div className="h-[275px]  flex justify-center items-center">
              <CircularProgress />
            </div>
          ) : (
            <>
              <div className="p-2.5 flex w-full">
                <div className="flex flex-col w-full">
                  <div className="flex w-full justify-between">
                    <SelectePicture
                      status="OPENED"
                      isEditable
                      selectedPicture={openedPicture}
                      setSelectedPicture={setOpenedPicture}
                    />
                    <SelectePicture
                      status="CLOSED"
                      isEditable
                      selectedPicture={closedPicture}
                      setSelectedPicture={setClosedPicture}
                    />
                    <SelectePicture
                      status="PLAYING"
                      isEditable
                      selectedPicture={playingPicture}
                      setSelectedPicture={setPlayingPicture}
                    />
                    <SelectePicture
                      status="OTHER"
                      isEditable
                      selectedPicture={otherPicture}
                      setSelectedPicture={setOtherPicture}
                    />
                  </div>

                  <div className="lg:flex lg:flex-row md:flex-row md:flex sm:flex sm:flex-col sm:items-center w-full">
                    <div className="h-full p-2.5 w-full flex flex-col gap-2.5">
                      <OSTextField name="reference" label="Référence" />
                      <OSTextField name="name" label="Nom Box" />
                      <OSSelectField
                        name="boxTypeId"
                        label="Type de box"
                        options={boxTypeList}
                        dataKey="name"
                        valueKey="id"
                        defaultValue=""
                      />
                    </div>
                    <div className="h-full p-2.5 w-full flex flex-col gap-2.5">
                      <OSTextField name="price" label="Prix" type="number" />
                      <OSTextField name="number" label="Nombre" type="number" />
                      <OSSelectField
                        id="badgeId"
                        name="badge"
                        label="Badge"
                        options={badges}
                        dataKey="desc"
                        valueKey="id"
                        defaultValue=""
                      />
                    </div>
                    <div className="h-full p-2.5 w-full flex flex-col gap-2.5">
                      <OSTextField
                        name="description"
                        label="Description"
                        multiline
                        rows={5}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full flex gap-2.5 justify-end px-5">
                <MuiContainedButton
                  variant="contained"
                  color="warning"
                  startIcon={<CloseRounded />}
                  className="!bg-orange-500 !normal-case text-white"
                  onClick={() => {
                    formikProps.resetForm();
                    dispatch(cancelEditBox());
                    dispatch(toggleForm(false));
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
            </>
          )}
        </Form>
      )}
    </Formik>
  );
}
