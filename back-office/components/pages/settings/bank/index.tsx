import PageTitle from '../../../shared/PageTitle';
import BankTable from './Table';

export default function BankForm() {
  return (
    <div className="bg-white h-full pb-2.5 w-full">
      <PageTitle title1="Liste de gestion des Bank" />
      <div className="h-[calc(100%_-_58px)]">
        <div className="w-full h-[1px] bg-gray-300 my-2"></div>
        <BankTable />
      </div>
    </div>
  );
}
