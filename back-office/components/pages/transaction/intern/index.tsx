import PageTitle from '../../../shared/PageTitle';

import { useAppSelector } from 'services/redux/hooks';
import TransationDetails from './TransactionDetails';
import TransactionTable from './TransactionTable';

export default function InternalTransactionComponent() {
  const { transaction, isEditing } = useAppSelector(
    (state) => state.transaction
  );

  return (
    <div className="bg-white h-full py-2.5 w-full">
      <PageTitle
        title1="Liste des transactions"
        title2={
          transaction && !isEditing
            ? 'Aperçue'
            : transaction && isEditing
            ? 'Modification'
            : 'Liste'
        }
      />

      <div className="h-[calc(100%_-_58px)]">
        {Object.keys(transaction).length === 0 && !isEditing && (
          <div className="flex w-full justify-center items-center text-[#2F435E] text-h5 h-[200px]">
            Aucune transaction sélectionnée
          </div>
        )}
        <div className="p-2.5 flex w-full">
          {Object.keys(transaction).length > 0 && <TransationDetails />}
        </div>
        <div className="w-full h-[1px] bg-gray-300 my-2"></div>
        <TransactionTable />
      </div>
    </div>
  );
}
