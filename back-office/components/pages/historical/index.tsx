import { Scrollbars } from 'react-custom-scrollbars-2';
import PageTitle from '../../shared/PageTitle';
import HistoricalTable from './Table';

export default function HistoricalComponent() {
  return (
    <div className="bg-white h-full py-2.5 w-full">
      <PageTitle title1="Historique des actions" />

      <div className="h-[calc(100%_-_58px)]">
        <Scrollbars>
          <HistoricalTable />
        </Scrollbars>
      </div>
    </div>
  );
}
