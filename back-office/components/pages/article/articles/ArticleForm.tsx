import CloseRounded from '@mui/icons-material/CloseRounded';
import Save from '@mui/icons-material/Save';
import { Form, Formik, FormikValues } from 'formik';
import React, { useEffect } from 'react';
import * as Yup from 'yup';

import { CircularProgress } from '@mui/material';
import useFetchUnitySizeListe from 'components/pages/settings/unitySize/hooks/useFetchUnitySize';
import OSTextField from 'components/shared/input/OSTextField';
import OSSelectField from 'components/shared/select/OSSelectField';
import ArticleDTO from 'data/dto/Article.dto';
import {
  createArticle,
  getArticle,
  updateArticle,
} from 'services/redux/article/_';
import {
  createArticlePhoto,
  updateArticlePhoto,
} from 'services/redux/article/_/articlePhoto';
import {
  cancelEditArticle,
  setActiveUi,
} from 'services/redux/article/_/articleSlice';
import {
  createPrice,
  getPrice,
  updatePrice,
} from 'services/redux/article/price';
import { postFile } from 'services/redux/file/useCase/postFile';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import useFetchSubCategoryListe from '../categories/hooks/useFetchSubCategoryList';
import useFetchProviderListe from '../providers/hooks/useFetchProviderList';
import SelectPictureArticle from './SelectPicture';
import useFetchArticleListe from './hooks/useFetchArticleList';
import { MuiContainedButton } from './styles';

export default function ArticleForm() {
  const dispatch = useAppDispatch();

  const { providerList } = useAppSelector((state) => state.provider);
  const { subCategoryList } = useAppSelector((state) => state.subCategory);
  const { unitySizeList } = useAppSelector((state) => state.unitySize);

  const fetchArticleList = useFetchArticleListe();
  const fetchProviderList = useFetchProviderListe();
  const fetchSousCategory = useFetchSubCategoryListe();
  const fetchUnitySizeList = useFetchUnitySizeListe();

  useEffect(() => {
    fetchProviderList();
    fetchSousCategory();
    fetchUnitySizeList();
    fetchArticleList();
  }, []);

  const [firstPic, setFirstPic] = React.useState<string | ArrayBuffer>('');
  const [secondPic, setSecondPic] = React.useState<string | ArrayBuffer>('');
  const [thirdPic, setThirdPic] = React.useState<string | ArrayBuffer>('');
  const [lastPic, setLastPic] = React.useState<string | ArrayBuffer>('');

  const { isEditing, article, loading } = useAppSelector(
    (state) => state.article
  );

  const initialValues: FormikValues = {
    reference: isEditing ? article?.reference : '',
    designation: isEditing ? article?.designation : '',
    subCategoryId: isEditing ? article?.subCategoryId : '',
    providerId: isEditing ? article?.providerId : '',
    type: isEditing ? article?.type : undefined,
    size: isEditing ? article?.size : undefined,
    color: isEditing ? article?.color : undefined,
    productUrl: isEditing ? article?.productUrl : undefined,
    observation: isEditing ? article?.observation : undefined,
    unitySizeId: isEditing ? article?.unitySizeId : undefined,
    oldPrice: isEditing ? article?.price?.oldPrice : 0,
    currentPrice: isEditing ? article?.price?.currentPrice : 0,
  };

  const handleSubmit = async (value: FormikValues) => {
    try {
      if (isEditing) {
        // updading article store result in res
        const res = await dispatch(
          updateArticle({
            id: article!.id as string,
            article: {
              reference: value.reference,
              designation: value.designation,
              type: value.type,
              size: value.size,
              color: value.color,
              productUrl: value.productUrl,
              observation: value.observation,
              providerId: value.providerId,
              unitySizeId: value.unitySizeId,
              subCategoryId: value.subCategoryId,
            },
          })
        );

        // update price => check if price existe yet
        if (value?.currentPrice) {
          const price = await dispatch(
            getPrice({
              id: '',
              args: {
                where: {
                  articleId: article!.id,
                },
              },
            })
          );
          if (price?.payload) {
            await dispatch(
              updatePrice({
                id: price?.payload[0].id as string,
                price: {
                  currentPrice: value.currentPrice,
                  oldPrice: value?.oldPrice,
                },
              })
            );
          } else {
            await dispatch(
              createPrice({
                currentPrice: value.currentPrice,
                oldPrice: value?.oldPrice,
                articleId: article!.id,
              })
            );
          }
        }

        // upload new photo if changed => check the Article if photo is to change or to uploading for first time
        if (res) {
          await updatePictureInsideArticle(firstPic, 'FIRST');
          await updatePictureInsideArticle(secondPic, 'SECOND');
          await updatePictureInsideArticle(thirdPic, 'THIRD');
          await updatePictureInsideArticle(lastPic, 'LAST');
        }
      } else {
        // creating new Article
        // if Article is created => upload photo && if photo is uploaded => create new Articlephoto
        const articleValue: ArticleDTO = {
          reference: value?.reference,
          designation: value?.designation,
          type: value?.type,
          size: value?.size,
          color: value?.color,
          productUrl: value?.productUrl,
          observation: value?.observation,
          providerId: value?.providerId,
          unitySizeId: value?.unitySizeId,
          subCategoryId: value?.subCategoryId,
        };

        const createdArticle = await dispatch(
          createArticle(articleValue)
        ).unwrap();

        if (createdArticle) {
          await dispatch(
            createPrice({
              currentPrice: value.currentPrice,
              oldPrice: value?.oldPrice,
              articleId: createdArticle!.id,
            })
          );

          // create article photo
          await createPictureInsideArticlePhoto(
            createdArticle.id as string,
            firstPic,
            'FIRST'
          );
          await createPictureInsideArticlePhoto(
            createdArticle.id as string,
            secondPic,
            'SECOND'
          );
          await createPictureInsideArticlePhoto(
            createdArticle.id as string,
            thirdPic,
            'THIRD'
          );
          await createPictureInsideArticlePhoto(
            createdArticle.id as string,
            lastPic,
            'LAST'
          );
        }
      }
      fetchArticleList();
    } catch (e) {
      /** show error here */
    }
  };

  async function updatePictureInsideArticle(
    selectedPic: string | ArrayBuffer,
    status: string
  ) {
    if (selectedPic) {
      const { files } = await uploadFile(selectedPic as string);
      if (files && files.length > 0) {
        await updateArticlePhotos(files[0].url, status);
      }
    }
  }

  async function createPictureInsideArticlePhoto(
    articleId: string,
    selectedPic: string | ArrayBuffer,
    status: string
  ) {
    if (selectedPic) {
      const { files } = await uploadFile(selectedPic as string);
      if (files && files.length > 0) {
        await createArticlePhotos(articleId, files[0].url, status);
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

  async function updateArticlePhotos(photoUrl: string, status: string) {
    if (article?.articlePhoto && article.articlePhoto.length > 0) {
      // check if Article status exist, if yes => update it else, create new
      let res: any;
      const currentArticlePhoto = article.articlePhoto.find(
        (item) => item.status === status
      );
      if (currentArticlePhoto) {
        res = await dispatch(
          updateArticlePhoto({
            id: currentArticlePhoto.id as string,
            articlePhoto: {
              articleId: article?.id,
              photoUrl: photoUrl,
              status: status,
            },
          })
        );
      } else {
        res = await createArticlePhotos(article?.id!, photoUrl, status);
      }
      if (res) {
        await dispatch(
          getArticle({
            id: article?.id as string,
            args: {
              include: { articlePhoto: true },
            },
          })
        );
      }
    } else {
      await createArticlePhotos(article?.id!, photoUrl, status);
    }
  }

  async function createArticlePhotos(
    articleId: string,
    photoUrl: string,
    status: string
  ) {
    await dispatch(
      createArticlePhoto({
        articleId: articleId,
        photoUrl: photoUrl,
        status: status,
      })
    ).unwrap();
  }

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={Yup.object({
        reference: Yup.string().required('Champ obligatoire'),
        designation: Yup.string().required('Champ obligatoire'),
        providerId: Yup.string().required('Champ obligatoire'),
        subCategoryId: Yup.string().required('Champ obligatoire'),
        // type: Yup.string().required('Champ obligatoire'),
        // size: Yup.string().required('Champ obligatoire'),
        // color: Yup.string().required('Champ obligatoire'),
        // observation: Yup.string().required('Champ obligatoire'),
        // unitySizeId: Yup.string().required('Champ obligatoire'),
        // productUrl: Yup.string().required(),
      })}
      onSubmit={async (value: FormikValues, action) => {
        try {
          await handleSubmit(value);
          action.resetForm({ values: initialValues });
          dispatch(cancelEditArticle());
          dispatch(setActiveUi('list'));
        } catch (error) {
          dispatch(setActiveUi('form'));
        }
      }}
    >
      {(formikProps) => (
        <Form>
          {loading ? (
            <div className="h-[275px]  flex justify-center items-center">
              <CircularProgress />
            </div>
          ) : (
            <>
              <div className="p-2.5 flex w-full ">
                <div className="flex flex-col w-full">
                  <div className="flex w-full justify-between">
                    <SelectPictureArticle
                      status="FIRST"
                      isEditable
                      selectedPicture={firstPic}
                      setSelectedPicture={setFirstPic}
                    />
                    <SelectPictureArticle
                      status="SECOND"
                      isEditable
                      selectedPicture={secondPic}
                      setSelectedPicture={setSecondPic}
                    />
                    <SelectPictureArticle
                      status="THIRD"
                      isEditable
                      selectedPicture={thirdPic}
                      setSelectedPicture={setThirdPic}
                    />
                    <SelectPictureArticle
                      status="LAST"
                      isEditable
                      selectedPicture={lastPic}
                      setSelectedPicture={setLastPic}
                    />
                  </div>

                  <div className="lg:flex lg:flex-row md:flex-row md:flex sm:flex sm:flex-col sm:items-center w-full">
                    <div className="h-full p-2.5 w-full flex flex-col gap-2.5">
                      <OSTextField
                        name="reference"
                        size="small"
                        label="Référence"
                      />
                      <OSTextField
                        name="designation"
                        size="small"
                        label="Designation"
                      />
                      <OSSelectField
                        id="subCategory"
                        name="subCategoryId"
                        label="Sous catégorie"
                        dataKey="name"
                        options={subCategoryList}
                        valueKey="id"
                      />
                      <OSSelectField
                        id="providerId"
                        name="providerId"
                        label="Fournisseur"
                        dataKey="companyName"
                        options={providerList}
                        valueKey="id"
                      />
                    </div>
                    <div className="h-full p-2.5 w-full flex flex-col gap-2.5">
                      <OSSelectField
                        id="type"
                        name="type"
                        label="Type"
                        dataKey="desc"
                        options={typeList}
                        valueKey="id"
                      />
                      <OSSelectField
                        id="unitySizeId"
                        name="unitySizeId"
                        label="Taille unitaire"
                        dataKey="name"
                        options={unitySizeList}
                        valueKey="id"
                      />
                      <OSTextField name="size" size="small" label="Taille" />
                      <OSTextField
                        name="productUrl"
                        size="small"
                        label="Url du produit"
                      />
                    </div>
                    <div className="h-full p-2.5 w-full flex flex-col gap-2.5">
                      <OSTextField name="color" size="small" label="Couleur" />
                      <OSTextField
                        name="observation"
                        size="small"
                        label="Observation"
                        multiline
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-2.5">
                <div className="px-2.5">Prix</div>
                <div className="flex gap-2.5">
                  <div className="h-full p-2.5 w-full flex gap-2.5">
                    <OSTextField
                      name="currentPrice"
                      size="small"
                      label="Prix actuel"
                      type="number"
                    />
                    <OSTextField
                      name="oldPrice"
                      size="small"
                      label="Ancien prix"
                      type="number"
                    />
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
                    dispatch(cancelEditArticle());
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
            </>
          )}
        </Form>
      )}
    </Formik>
  );
}

const typeList = [
  { id: 'MAN', name: 'MAN', desc: 'Homme' },
  { id: 'WOMAN', name: 'WOMAN', desc: 'Femme' },
  { id: 'CHILD', name: 'CHILD', desc: 'Enfant' },
];
