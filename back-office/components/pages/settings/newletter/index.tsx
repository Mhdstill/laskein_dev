import PageTitle from '../../../shared/PageTitle';
import NewLetterTable from './Table';

export default function NewLetterForm() {
  return (
    <div className="bg-white h-full pb-2.5 w-full">
      <PageTitle title1="Liste de gestion des nouvelles lettres" />
      <div className="h-[calc(100%_-_58px)]">
        <NewLetterTable />
      </div>
    </div>
  );
}
