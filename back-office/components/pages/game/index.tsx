import { Scrollbars } from 'react-custom-scrollbars-2';
import PageTitle from '../../shared/PageTitle';
import GameTable from './Table';

export default function GameComponent() {
  return (
    <div className="bg-white h-full py-2.5 w-full">
      <PageTitle title1="Historique des jeux" />

      <div className="h-[calc(100%_-_58px)]">
        <Scrollbars>
          <GameTable />
        </Scrollbars>
      </div>
    </div>
  );
}
