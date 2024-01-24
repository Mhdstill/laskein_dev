import PageTitle from '../../../shared/PageTitle';
import BoxTypeForm from './Form';
import BoxTypeTable from './Table';

export default function BoxType() {
  return (
    <div className="bg-white h-full pb-2.5 w-full">
      <PageTitle title1="Gestion catégorie" title2={'Ajout'} />

      <div className="h-[calc(100%_-_58px)]">
        <BoxTypeForm />
        <div className="w-full h-[1px] bg-gray-300 my-2"></div>
        <BoxTypeTable />
      </div>
    </div>
  );
}
