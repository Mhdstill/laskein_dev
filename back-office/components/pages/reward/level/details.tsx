import { CloseRounded } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { setActiveUi } from 'services/redux/post/postSlice';
import { cancelEditRewardLevel } from 'services/redux/reward/level/rewardLevelSlice';
import KeyValue from '../../../shared/KeyValue';
import { MuiContainedButton } from './styles';

export default function RewardLevelDetails() {
  const { rewardLevel } = useAppSelector((state) => state.rewardLevel);

  const dispatch = useAppDispatch();

  return (
    <div className="p-2.5 flex flex-col w-full">
      <div className="flex lg:flex-row md:flex-row sm:flex-col items-start w-full">
        <div className="h-full p-2.5 w-full flex flex-col gap-8">
          <KeyValue title="Numéro" value={rewardLevel?.orderNumber} />
          <KeyValue title="Nom" value={rewardLevel?.name} />
          <KeyValue
            title="Seuil de déverrouillage"
            value={rewardLevel?.unlockThreshold}
          />
        </div>
        <div className="h-full p-2.5 w-full flex flex-col gap-8">
          <KeyValue title="Description" value={rewardLevel?.description} />
        </div>
      </div>

      <div className="w-full flex gap-2.5 justify-end px-5">
        <MuiContainedButton
          variant="contained"
          color="warning"
          startIcon={<CloseRounded />}
          className="!bg-orange-500 !normal-case text-white"
          onClick={() => {
            dispatch(cancelEditRewardLevel());
            dispatch(setActiveUi('list'));
          }}
        >
          Annuler
        </MuiContainedButton>
      </div>
    </div>
  );
}
