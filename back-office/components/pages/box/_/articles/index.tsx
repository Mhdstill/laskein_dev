import KeyboardDoubleArrowRight from '@mui/icons-material/KeyboardDoubleArrowRight';
import Undo from '@mui/icons-material/Undo';
import React from 'react';

import { useRouter } from 'next/router';
import {
  createBoxArticle,
  getBoxArticleList,
} from 'services/redux/box/box-article';
import { enqueueSnackbar } from 'services/redux/notification/notificationSlice';
import {
  cancelEditBox,
  toggleArticleInsideABox,
} from '../../../../../services/redux/box/boxSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../services/redux/hooks';
import PageTitle from '../../../../shared/PageTitle';
import AvalaibleArticleTable from './AvalaibleArticleTable';
import SelectedArticleTable from './SelectedArticleTable';
import { MuiContainedButton, MuiIconButton } from './styles';

export default function ArticlesInBoxComponent() {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const { box } = useAppSelector((state) => state.box);

  const { boxArticleList } = useAppSelector((state) => state.boxArticle);

  const [selectedArticle, setSelectedArticle] = React.useState<
    readonly string[]
  >([]);

  // create
  // eslint-disable-next-line no-unused-vars
  async function insertArticleInsideBox() {
    if (box && selectedArticle) {
      for (const articleId of selectedArticle) {
        if (boxArticleList) {
          for (const article of boxArticleList) {
            if (articleId === article.article?.id) {
              dispatch(
                enqueueSnackbar({
                  message: `Article non inséré ${article.article?.designation} dans le box! Cette article existe déjà dans ce box`,
                  options: {
                    variant: 'warning',
                  },
                })
              );
              return;
            }
          }
          await dispatch(
            createBoxArticle({
              articleId: articleId,
              boxId: box.id,
              winningChance: 0,
            })
          );
          await dispatch(
            getBoxArticleList({
              args: {
                include: {
                  article: true,
                  box: true,
                },
                where: {
                  boxId: { equals: box?.id as string },
                },
              },
            })
          );
          setSelectedArticle([]);
        }
      }
    }
  }

  return (
    <div className="bg-white h-full pb-2.5 w-full">
      <div className="flex items-center justify-between border-b border-b-gray-100 pr-2.5">
        <PageTitle title1="Gestion des  produits dans un box" hideBorder />
        <MuiContainedButton
          variant="contained"
          color="primary"
          startIcon={<Undo />}
          className="!normal-case bg-[#376F70] text-white"
          sx={{
            background: '#376F70',
          }}
          onClick={() => {
            dispatch(toggleArticleInsideABox(false));
            dispatch(cancelEditBox());
            router.push('/box');
          }}
        >
          Retour
        </MuiContainedButton>
      </div>

      <div className="flex bg-gray-100 gap-3 w-full h-full pt-2.5">
        <AvalaibleArticleTable
          selected={selectedArticle}
          setSelected={setSelectedArticle}
        />

        <div className="flex flex-col items-center justify-center gap-2.5 h-auto">
          <MuiIconButton size="small" onClick={() => insertArticleInsideBox()}>
            <KeyboardDoubleArrowRight />
          </MuiIconButton>
        </div>

        <SelectedArticleTable />
      </div>
    </div>
  );
}
