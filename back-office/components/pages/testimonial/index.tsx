import { Scrollbars } from 'react-custom-scrollbars-2';
import PageTitle from '../../shared/PageTitle';
import TestimonialTable from './Table';

export default function TestimonialComponent() {
  return (
    <div className="bg-white h-full py-2.5 w-full">
      <PageTitle title1="Historique de témoignages" />

      <div className="h-[calc(100%_-_58px)]">
        <Scrollbars>
          <TestimonialTable />
        </Scrollbars>
      </div>
    </div>
  );
}
