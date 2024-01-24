import { Scrollbars } from 'react-custom-scrollbars-2';
import PageTitle from '../../shared/PageTitle';

import { useAppSelector } from 'services/redux/hooks';
import OrderDetails from './OrderDetails';
import OrderTable from './OrderTable';

export default function OrderComponent() {
  const { activeUi } = useAppSelector((state) => state.order);
  return (
    <div className="bg-white h-full py-2.5 w-full">
      <PageTitle
        title1="Liste des Commandes"
        title2={activeUi === 'details' ? 'Détails' : 'Liste'}
      />

      <div className="h-[calc(100%_-_58px)]">
        <Scrollbars>
          {activeUi === 'list' ? (
            <div
              // onClick={() => setActiveUi('details')}
              className="flex w-full justify-center items-center text-[#2F435E] text-h5 h-[250px]"
            >
              Aucun commande séléctionné
            </div>
          ) : (
            <>{activeUi === 'details' && <OrderDetails />}</>
          )}

          <div className="w-full h-[1px] bg-gray-300 my-2"></div>
          <OrderTable />
        </Scrollbars>
      </div>
    </div>
  );
}
