import React from 'react';

import Edit from '@mui/icons-material/Edit';
import { editBox } from 'services/redux/box/useCase/edit';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import KeyValue from '../../../shared/KeyValue';
import SelectePicture from './SelectePicture';
import { MuiContainedButton } from './styles';

export default function BoxDetails() {
  const dispatch = useAppDispatch();

  const { box } = useAppSelector((state) => state.box);

  const baseUrl = process?.env?.NEXT_PUBLIC_API_URL;

  const [imgUrl, setimgUrl] = React.useState('');

  React.useEffect(() => {
    if (box) {
      const currentBoxImage = box.boxImage?.find(
        (item) => item.status === status
      );
      if (currentBoxImage) {
        const url =
          baseUrl +
          '/upload-file/' +
          currentBoxImage?.photoUrl!.replace('/file/', '');
        setimgUrl(url);
      }
    }
  }, [box, imgUrl]);

  function handleClickEditBox() {
    dispatch(
      editBox({
        id: box?.id,
        args: {
          include: { boxImage: true },
        },
      })
    );
  }

  return (
    <div className="flex flex-col w-full">
      <div className="p-2.5 flex w-full">
        <div className="flex flex-col w-full">
          <div className="p-2.5 min-w[-225px] w-full flex justify-between">
            <SelectePicture status="OPENED" />
            <SelectePicture status="CLOSED" />
            <SelectePicture status="PLAYING" />
            <SelectePicture status="OTHER" />
          </div>
          <div className="lg:flex lg:flex-row md:flex-row md:flex sm:flex sm:flex-col sm:items-center w-full">
            <div className="h-full p-2.5 w-full flex flex-col gap-8">
              <KeyValue title="Reference" value={box?.reference} />
              <KeyValue title="Nom box" value={box?.name} />
              <KeyValue title="Type du box" value={box?.boxType?.name} />
            </div>
            <div className="h-full p-2.5 w-full flex flex-col gap-8">
              <KeyValue title="Prix" value={box?.price} />
              <KeyValue title="Nombre" value={box?.number} />
              <KeyValue title="Badge" value={box?.badge} />
            </div>
            <div className="h-full p-2.5 w-full flex flex-col gap-8">
              <KeyValue title="Description" value={box?.description} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex gap-2.5 justify-end px-5">
        <MuiContainedButton
          variant="contained"
          color="primary"
          startIcon={<Edit />}
          className="normal-case bg-[#376F70] text-white"
          onClick={() => handleClickEditBox()}
        >
          Editer
        </MuiContainedButton>
      </div>
    </div>
  );
}
