import PageTitle from '../../../shared/PageTitle';
import { default as CategoryForm } from './CategoryForm';
import { default as CategoryTable } from './CategoryTable';
import SubCategoryForm from './sub/SubCategoryForm';
import SubCategoryTable from './sub/SubCategoryTable';

export default function Prices() {
  return (
    <div className="bg-white h-full pb-2.5 w-full">
      <div className="flex bg-gray-200 gap-3 w-full lg:flex-row md:flex-row sm:flex-col">
        <div className="bg-white lg:w-2/5 md:w-2/5 sm:w-full">
          <PageTitle title1="Gestion catégorie" title2={'Ajout'} />

          <div className="h-[calc(100%_-_58px)]">
            <CategoryForm />
            <div className="w-full h-[1px] bg-gray-300 my-2"></div>
            <CategoryTable />
          </div>
        </div>

        <div className="bg-white lg:w-3/5 md:w-3/5 sm:w-full">
          <PageTitle title1="Gestion sous-catégorie" title2={'Ajout'} />
          <div className="h-[calc(100%_-_58px)]">
            <SubCategoryForm />
            <div className="w-full h-[1px] bg-gray-300 my-2"></div>
            <SubCategoryTable />
          </div>
        </div>
      </div>
    </div>
  );
}
