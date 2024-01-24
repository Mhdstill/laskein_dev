import Add from '@mui/icons-material/Add';
import Button from '@mui/material/Button';

import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { setActiveUi } from 'services/redux/reward/level/rewardLevelSlice';
import PageTitle from '../../../shared/PageTitle';
import RewardLevelTable from './Table';
import BoxRewardLevel from './boxRewardLevel';
import RewardLevelDetails from './details';
import RewardLevelForm from './form';

export default function RewardLevel() {
  const { activeUi } = useAppSelector((state) => state.rewardLevel);

  const dispatch = useAppDispatch();

  return (
    <div className="bg-white h-full pb-2.5 w-full">
      <PageTitle
        title1="Gestion pallier de récompense"
        title2={
          activeUi === 'form'
            ? 'Ajout | Modification'
            : activeUi === 'box'
            ? 'Gerer box dans ce pallier'
            : 'Liste'
        }
      />
      {activeUi === 'box' && (
        <div className="h-[calc(100%_-_58px)]">
          <BoxRewardLevel />
        </div>
      )}
      {activeUi !== 'box' && (
        <div className="h-[calc(100%_-_58px)]">
          {activeUi === 'list' ? (
            <div className="flex gap-3 w-full h-[275px] justify-center items-center text-[#2F435E] text-h5">
              Aucun pallier de récompense seléctionné
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
              {activeUi === 'form' && <RewardLevelForm />}
              {activeUi === 'details' && <RewardLevelDetails />}
            </>
          )}
          <div className="w-full h-[1px] bg-gray-300 my-2"></div>
          <RewardLevelTable />
        </div>
      )}
    </div>
  );
}
