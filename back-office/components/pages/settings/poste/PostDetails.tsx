import { CloseRounded } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { cancelEditPost, setActiveUi } from 'services/redux/post/postSlice';
import KeyValue from '../../../shared/KeyValue';
import { MuiContainedButton } from './styles';

export default function PostDetails() {
  const { post } = useAppSelector((state) => state.post);

  const dispatch = useAppDispatch();

  return (
    <div className="p-2.5 flex flex-col w-full">
      <div className="flex lg:flex-row md:flex-row sm:flex-col items-start w-full">
        <div className="h-full p-2.5 w-full flex flex-col gap-8">
          <KeyValue title="Titre" value={post.title} />
          <KeyValue title="URL de publication" value={post.postUrl} />
          <KeyValue title="Reference article" value={post.article?.reference} />
        </div>
        <div className="h-full p-2.5 w-full flex flex-col gap-8">
          <KeyValue title="Contenu" value={post.content} />
        </div>
      </div>

      <div className="w-full flex gap-2.5 justify-end px-5">
        <MuiContainedButton
          variant="contained"
          color="warning"
          startIcon={<CloseRounded />}
          className="!bg-orange-500 !normal-case text-white"
          onClick={() => {
            dispatch(cancelEditPost());
            dispatch(setActiveUi('list'));
          }}
        >
          Annuler
        </MuiContainedButton>
      </div>
    </div>
  );
}
