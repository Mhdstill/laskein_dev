import PageTitle from '../../../shared/PageTitle';

import OuterTransactionDTO from 'data/dto/OuterTransaction.dto';
import React from 'react';
import OuterTransationDetails from './Details';
import OuterTransactionTable from './Table';

export default function OuterTransactionComponent() {
  const [outertransaction, setOuterTransaction] = React.useState<
    OuterTransactionDTO | undefined
  >({} as OuterTransactionDTO);

  return (
    <div className="bg-white h-full py-2.5 w-full">
      <PageTitle
        title1="Dépots et retraits"
        title2={outertransaction ? 'Modification' : 'Liste'}
      />

      <div className="h-[calc(100%_-_58px)]">
        {(!outertransaction || Object?.keys(outertransaction).length === 0) && (
          <div className="flex w-full justify-center items-center text-[#2F435E] text-h5 h-[200px]">
            Aucune transaction sélectionnée
          </div>
        )}
        <div className="p-2.5 flex w-full">
          {outertransaction && Object?.keys(outertransaction).length > 0 && (
            <OuterTransationDetails />
          )}
        </div>
        <div className="w-full h-[1px] bg-gray-300 my-2"></div>
        <OuterTransactionTable setOuterTransaction={setOuterTransaction} />
      </div>
    </div>
  );
}
