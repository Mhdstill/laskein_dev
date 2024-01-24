import IconButton from '@mui/material/IconButton';
import React from 'react';

import Close from '@mui/icons-material/Close';
import Delete from '@mui/icons-material/Delete';
import Save from '@mui/icons-material/Save';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useFetchOfferListe from 'components/pages/subscription/offer/hooks/useFetchOfferList';
import OSTextField from 'components/shared/input/OSTextField';
import BannerImageDTO from 'data/dto/BannerImage.dto';
import BoxDTO from 'data/dto/Box.dto';
import { Form, Formik, FormikValues } from 'formik';
import {
  createBannerImage,
  deleteBannerImage,
  updateBannerImage,
} from 'services/redux/advertissment/banner';
import { cancelEditBannerImage } from 'services/redux/advertissment/banner/imageSlice';
import { getBoxList } from 'services/redux/box/useCase/getList';
import { postFile } from 'services/redux/file/useCase/postFile';
import { useAppDispatch } from 'services/redux/hooks';
// import Autocomplete from './Autocomplete';
import SelectPicture from './Picture';
import useFetchBannerImageList from './hooks/useFetchBannerImageList';

type BannerImageFormProps = {
  status: string;
  bannerImage?: BannerImageDTO;
  title?: string;
};

export default function BannerImageForm({
  status,
  bannerImage,
  title,
}: BannerImageFormProps) {
  const dispatch = useAppDispatch();

  const fetchBannerImageList = useFetchBannerImageList();

  const initialValues: FormikValues = {
    offerId: bannerImage?.offerId ? bannerImage?.offerId : '',
    bannerLink: bannerImage?.bannerLink ? bannerImage?.bannerLink : '',
  };

  const [selectedType, setSelectedType] = React.useState<'box' | 'offer'>(
    'box'
  );

  // const { boxList, loading: boxLoading } = useAppSelector((state) => state.box);

  // const { offerList } = useAppSelector((state) => state.offer);

  const [searchedBox, setSearchedBox] = React.useState<string>('');

  const [selectedPicture, setSelectedPicture] = React.useState<
    string | ArrayBuffer
  >('');

  const [selectedBox, setSelectedBox] = React.useState<BoxDTO>({} as BoxDTO);

  const fetchOfferList = useFetchOfferListe();

  React.useEffect(() => {
    if (bannerImage) {
      setSearchedBox(bannerImage?.box?.name as string);
      setSelectedBox(bannerImage?.box as BoxDTO);
    }
  }, [bannerImage]);

  React.useEffect(() => {
    dispatch(
      getBoxList({
        ...(searchedBox && {
          args: {
            where: {
              name: { contains: searchedBox, mode: 'insensitive' },
            },
          },
        }),
      })
    );
  }, [searchedBox]);

  React.useEffect(() => {
    if (bannerImage?.boxId) {
      setSelectedType('box');
    } else if (bannerImage?.offerId) {
      setSelectedType('offer');
    } else {
      setSelectedType('box');
    }
  }, [bannerImage]);

  React.useEffect(() => {
    fetchOfferList();
  }, []);

  // upload image
  async function uploadFile(metadata: string) {
    const res = await dispatch(
      postFile({
        file: metadata,
      })
    ).unwrap();
    return res;
  }

  // create or update banner image
  async function handleSubmit(value: FormikValues | BannerImageDTO) {
    if (selectedPicture) {
      const { files } = await uploadFile(selectedPicture as string);
      if (files && files.length > 0) {
        if (bannerImage) {
          if (selectedType === 'offer') {
            await dispatch(
              updateBannerImage({
                id: bannerImage?.id as string,
                bannerImage: {
                  bannerImgUrl: files[0].url as string,
                  boxId: null,
                  bannerLink: value.bannerLink as string,
                  type: status as string,
                  offerId: value.offerId,
                },
              })
            );
          } else {
            await dispatch(
              updateBannerImage({
                id: bannerImage?.id as string,
                bannerImage: {
                  bannerImgUrl: files[0].url as string,
                  boxId: selectedBox?.id as string,
                  bannerLink: value?.bannerLink as string,
                  type: status as string,
                  offerId: null,
                },
              })
            );
          }
        } else {
          if (selectedType === 'offer') {
            await dispatch(
              createBannerImage({
                bannerImgUrl: files[0].url as string,
                boxId: null,
                bannerLink: value.bannerLink as string,
                type: status as string,
                offerId: value?.offerId,
              })
            );
          } else {
            await dispatch(
              createBannerImage({
                bannerImgUrl: files[0].url as string,
                boxId: selectedBox?.id as string,
                bannerLink: value.bannerLink as string,
                type: status as string,
                offerId: null,
              })
            );
          }
        }
      }
    }
    fetchBannerImageList();
  }

  return (
    <div className="flex flex-col gap-4">
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={async (value: FormikValues, action) => {
          await handleSubmit(value);
          action.resetForm({
            values: {
              offerId: '',
              bannerLink: '',
            },
          });
          dispatch(cancelEditBannerImage());
        }}
      >
        {(formikProps) => (
          <Form className="flex flex-col gap-4">
            <Typography variant="body2">{title}</Typography>
            <SelectPicture
              status={status}
              isEditable
              selectedPicture={selectedPicture}
              setSelectedPicture={setSelectedPicture}
              bannerImage={bannerImage}
            />
            {/* <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="box"
              name="radio-buttons-group"
              row
              className="px-2"
            >
              <FormControlLabel
                value="box"
                checked={selectedType === 'box'}
                control={<Radio />}
                label="Box"
                onChange={() => setSelectedType('box')}
              />
              <FormControlLabel
                value="offer"
                checked={selectedType === 'offer'}
                control={<Radio />}
                label="Offre"
                onChange={() => setSelectedType('offer')}
              />
            </RadioGroup>
            {selectedType === 'box' && (
              <Autocomplete
                elementList={boxList}
                searchedValue={searchedBox}
                setSearchedValue={setSearchedBox}
                setSelectedElement={setSelectedBox}
                loading={boxLoading}
                placeholder="Rechercher un box"
                objectKey="name"
              />
            )}
            {selectedType === 'offer' && (
              <div className="px-2">
                <OSSelectField
                  name="offerId"
                  label="Offre d'abonnement"
                  options={offerList}
                  dataKey="name"
                  valueKey="id"
                />
              </div>
            )} */}
            <OSTextField
              name="bannerLink"
              label="Lien à pointer"
              className="px-2"
            />
            <div className="flex gap-4 justify-end px-2">
              <IconButton
                size="small"
                onClick={() => {
                  formikProps.resetForm();
                  setSelectedBox({} as BoxDTO);
                  if (selectedBox) setSelectedBox({} as BoxDTO);
                  if (searchedBox != '') setSearchedBox('');
                }}
              >
                <Close />
              </IconButton>
              {bannerImage && (
                <IconButton
                  size="small"
                  onClick={() => {
                    dispatch(
                      deleteBannerImage({
                        id: bannerImage?.id as string,
                      })
                    );
                    fetchBannerImageList();
                    if (selectedBox) setSelectedBox({} as BoxDTO);
                    if (searchedBox != '') setSearchedBox('');
                  }}
                  color="warning"
                >
                  <Delete />
                </IconButton>
              )}
              <Button
                variant="contained"
                size="small"
                type="submit"
                className="bg-[#2F435E]"
                startIcon={<Save />}
              >
                Enregistrer
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
