import Add from '@mui/icons-material/Add';
import Button from '@mui/material/Button';

import { setActiveUi } from 'services/redux/article/_/articleSlice';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import PageTitle from '../../../shared/PageTitle';
import ArticleDetails from './ArticleDetails';
import ArticleForm from './ArticleForm';
import ArticleTable from './ArticleTable';

export default function Articles() {
  const { activeUi } = useAppSelector((state) => state.article);

  const dispatch = useAppDispatch();

  return (
    <div className="bg-white h-full pb-2.5 w-full">
      <PageTitle
        title1="Gestion article"
        title2={activeUi === 'form' ? 'Ajout | Modification' : 'Liste'}
      />

      <div className="h-[calc(100%_-_58px)]">
        {activeUi === 'list' ? (
          <div className="flex gap-3 w-full h-[275px] justify-center items-center text-[#2F435E] text-h5">
            Aucun artice seléctionné{' '}
            <Button
              startIcon={<Add />}
              onClick={() => {
                dispatch(setActiveUi('form'));
              }}
              variant="contained"
              className="bg-[#376F70] shadow-none"
            >
              Ajouter
            </Button>
          </div>
        ) : (
          // <div className="p-2.5 flex w-full justify-center ">
          <>
            {activeUi === 'form' && <ArticleForm />}
            {activeUi === 'details' && <ArticleDetails />}
          </>
        )}
        <div className="w-full h-[1px] bg-gray-300 my-2"></div>
        <ArticleTable />
      </div>
    </div>
  );
}
