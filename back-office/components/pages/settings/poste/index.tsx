import Add from '@mui/icons-material/Add';
import Button from '@mui/material/Button';

import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { setActiveUi } from 'services/redux/post/postSlice';
import PageTitle from '../../../shared/PageTitle';
import PostDetails from './PostDetails';
import PosteTable from './Table';
import PostForm from './postForm';

export default function BlogPost() {
  const { activeUi } = useAppSelector((state) => state.post);

  const dispatch = useAppDispatch();

  return (
    <div className="bg-white h-full pb-2.5 w-full">
      <PageTitle
        title1="Gestion post"
        title2={activeUi === 'form' ? 'Ajout | Modification' : 'Liste'}
      />
      <div className="h-[calc(100%_-_58px)]">
        {activeUi === 'list' ? (
          <div className="flex gap-3 w-full h-[275px] justify-center items-center text-[#2F435E] text-h5">
            Aucun post seléctionné{' '}
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
          <>
            {activeUi === 'form' && <PostForm />}
            {activeUi === 'details' && <PostDetails />}
          </>
        )}
        <div className="w-full h-[1px] bg-gray-300 my-2"></div>
        <PosteTable />
      </div>
    </div>
  );
}
