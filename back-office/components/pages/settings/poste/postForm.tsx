import CloseRounded from '@mui/icons-material/CloseRounded';
import Save from '@mui/icons-material/Save';
import * as Yup from 'yup';

import Autocomplete from 'components/pages/advertissement/banner/Autocomplete';
import OSTextField from 'components/shared/input/OSTextField';
import ArticleDTO from 'data/dto/Article.dto';
import PostDTO from 'data/dto/Post.dto';
import { Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { getArticleList } from 'services/redux/article/_';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { createPost, updatePost } from 'services/redux/post';
import { cancelEditPost, setActiveUi } from 'services/redux/post/postSlice';
import useFetchPostListe from './hooks/useFetchPosteList';
import { MuiContainedButton } from './styles';

export default function PostForm() {
  const { isEditing, post } = useAppSelector((state) => state.post);
  const fetchPostListe = useFetchPostListe();
  const dispatch = useAppDispatch();

  const { articleList, loading } = useAppSelector((state) => state.article);

  const [selectedArticle, setSelectedArticle] = React.useState<ArticleDTO>(
    {} as ArticleDTO
  );

  const [searchedArticle, setSearchedArticle] = React.useState<string>('');

  useEffect(() => {
    fetchPostListe();
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(
      getArticleList({
        args: {
          where: {
            designation: { contains: searchedArticle, mode: 'insensitive' },
          },
        },
      })
    );
  }, [searchedArticle]);

  const initialValues: PostDTO = {
    title: '',
    content: '',
    postUrl: '',
    articleId: '',
  };

  React.useEffect(() => {
    if (isEditing && post) {
      setSearchedArticle(post?.article?.designation as string);
      setSelectedArticle(post?.article as ArticleDTO);
    }
  }, [post]);

  const handleSubmit = async (value: PostDTO) => {
    try {
      if (isEditing) {
        await dispatch(
          updatePost({
            id: post.id as string,
            post: {
              title: value.title,
              content: value.content,
              postUrl: value.postUrl,
              articleId: selectedArticle?.id!,
            },
          })
        );
      } else {
        await dispatch(
          createPost({
            title: value.title,
            content: value.content,
            postUrl: value.postUrl,
            articleId: selectedArticle?.id!,
          })
        );
      }
      fetchPostListe();
    } catch (e) {
      /** show error here */
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={isEditing ? post : initialValues}
      validationSchema={Yup.object({
        title: Yup.string().required('Champ obligatoire'),
        // articleId: Yup.string().required('Champ obligatoire'),
        postUrl: Yup.string().required('Champ obligatoire'),
        content: Yup.string().required('Champ obligatoire'),
      })}
      onSubmit={async (value: PostDTO, action) => {
        await handleSubmit(value);
        action.resetForm({ values: initialValues });
        dispatch(cancelEditPost());
        dispatch(setActiveUi('list'));
      }}
    >
      {(formikProps) => (
        <Form>
          <div className="bg-white h-full pb-2.5 w-full">
            <div className="h-[calc(100%_-_58px)]">
              <div className="flex flex-col sm:items-center w-full mb-2.5">
                <div className="h-full p-2.5 w-full flex flex-col gap-2.5">
                  <OSTextField name="title" size="small" label="Title" />
                  <OSTextField
                    name="content"
                    size="small"
                    label="Contenu"
                    multiline
                  />
                </div>
                <div className="h-full p-2.5 w-full flex flex-col gap-2.5">
                  <OSTextField
                    name="postUrl"
                    size="small"
                    label="URL de publication"
                  />
                  {/* <OSSelectField
                    id="articleId"
                    name="articleId"
                    label="Article"
                    dataKey="reference"
                    options={articleList}
                    valueKey="id"
                  /> */}
                </div>

                <div className="w-full p-0.5">
                  <Autocomplete
                    elementList={articleList}
                    loading={loading}
                    placeholder="Rechercher un article"
                    setSelectedElement={setSelectedArticle}
                    searchedValue={searchedArticle}
                    setSearchedValue={setSearchedArticle}
                    objectKey="designation"
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
                    dispatch(cancelEditPost());
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
