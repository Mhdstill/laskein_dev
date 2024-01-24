import Add from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import React from 'react';

import { toggleForm } from 'services/redux/box/boxSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../services/redux/hooks';
import PageTitle from '../../../shared/PageTitle';
import BoxDetails from './BoxDetails';
import BoxForm from './BoxForm';
import BoxTable from './BoxTable';
import ArticlesInBoxComponent from './articles';

export default function _Box() {
  const dispatch = useAppDispatch();

  const { showArticleInBox, showForm, isEditing, box } = useAppSelector(
    (state) => state.box
  );

  const [title, setTitle] = React.useState<string>('');

  React.useEffect(() => {
    if (!isEditing && isObjectEmpty(box) && !showForm) {
      setTitle('Liste');
    }
    if (!isEditing && box) setTitle('Aperçue');
    if (isEditing && box) setTitle('Modifier');
    if (!isEditing && !box && showForm) setTitle('Créer');
  }, [isEditing, box]);

  function isObjectEmpty(obj: any) {
    return Object.values(obj).length === 0;
  }

  return (
    <>
      {showArticleInBox ? (
        <ArticlesInBoxComponent />
      ) : (
        <div className="bg-white h-full pb-2.5 w-full">
          <PageTitle title1="Gestion box" title2={title} />

          <div className="h-[calc(100%_-_58px)]">
            {!isEditing && isObjectEmpty(box) && showForm && <BoxForm />}

            {!isEditing && isObjectEmpty(box) && !showForm && (
              <div className="flex gap-3 w-full justify-center items-center text-[#2F435E] text-h5 h-[245px]">
                Sélectionner un box ou
                <Button
                  startIcon={<Add />}
                  onClick={() => {
                    dispatch(toggleForm(true));
                  }}
                  variant="contained"
                  className="bg-[#376F70] shadow-none"
                >
                  Ajouter
                </Button>
              </div>
            )}

            {isEditing && !isObjectEmpty(box) && <BoxForm />}

            {!isEditing && !isObjectEmpty(box) && <BoxDetails />}

            <div className="w-full h-[1px] bg-gray-300 my-2"></div>

            <BoxTable />
          </div>
        </div>
      )}
    </>
  );
}
