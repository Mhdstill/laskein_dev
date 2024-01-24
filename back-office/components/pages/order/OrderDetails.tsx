import { CloseRounded } from '@mui/icons-material';
import LinkSharp from '@mui/icons-material/LinkSharp';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { cancelEditOrder, setActiveUi } from 'services/redux/order/orderSlice';
import KeyValue from '../../shared/KeyValue';
import { MuiContainedButton } from './styles';

export default function OrderDetails() {
  const { order } = useAppSelector((state) => state.order);
  const formatDate = (date: Date) => {
    if (!date) {
      return 'Date non disponible';
    }

    const formattedDate = new Date(date);
    const day = formattedDate.getDate().toString().padStart(2, '0');
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
    const year = formattedDate.getFullYear();
    const hours = formattedDate.getHours().toString().padStart(2, '0');
    const minutes = formattedDate.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} à ${hours}h${minutes}min`;
  };

  const dispatch = useAppDispatch();

  return (
    <>
      <div className=" lg:flex lg:flex-row md:flex-row md:flex sm:flex sm:flex-col sm:items-center w-full py-3">
        <div className="h-full p-2.5 w-full flex flex-col gap-2.5 justify-between border-r border-r-gray-100">
          <KeyValue
            title="Identifiant"
            value={order.shoppingCart?.user?.username}
          />
          <KeyValue title="Nom" value={order.shoppingCart?.user?.lastName} />
          <KeyValue title="Email" value={order.shoppingCart?.user?.email} />
          <KeyValue title="Téléphone" value={order.shoppingCart?.user?.phone} />
          <KeyValue
            title="Adresse"
            value={`${order.shoppingCart?.user?.address?.region}, ${order.shoppingCart?.user?.address?.firstAdress} , ${order.shoppingCart?.user?.address?.zipCode}`}
          />
        </div>
        <div className="h-full p-2.5 w-full flex flex-col gap-2.5 justify-between border-r border-r-gray-100">
          <KeyValue
            title="Reference produit"
            value={order.shoppingCart?.game?.article?.reference}
          />
          <KeyValue title="Code barre" value="code0024" />
          <KeyValue
            title="Fournisseur"
            value={order.shoppingCart?.game?.article?.provider?.companyName}
          />
          <KeyValue
            title="Designation"
            value={order.shoppingCart?.game?.article?.designation}
          />

          <KeyValue
            title="Prix"
            value={
              order?.shoppingCart?.game?.article?.price?.currentPrice + '€'
            }
          />
        </div>
        <div className="h-full p-2.5 w-full flex flex-col gap-2.5 justify-between">
          <div className="flex gap-2.5 items-center">
            <Typography
              variant="body2"
              sx={{ fontWeight: 'bold' }}
              color="primary"
            >
              Lien du produit :
            </Typography>
            <Link href={'https://amazon.com'} passHref target="_blank">
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<LinkSharp />}
                size="small"
              >
                Commender le produit
              </Button>
            </Link>
          </div>
          <KeyValue title="Refence commande" value={order.orderNumber} />
          <KeyValue
            title="Date commande"
            value={
              order?.shoppingCart?.winningDate
                ? formatDate(order.shoppingCart.winningDate)
                : 'Date non disponible'
            }
          />
          <KeyValue title="Status commande" value={order.status} />
        </div>
      </div>

      <div className="w-full flex  gap-2.5 justify-end px-5">
        <MuiContainedButton
          variant="contained"
          color="warning"
          startIcon={<CloseRounded />}
          className="!bg-orange-500 !normal-case text-white"
          onClick={() => {
            dispatch(cancelEditOrder());
            dispatch(setActiveUi('list'));
          }}
        >
          Annuler
        </MuiContainedButton>
      </div>
    </>
  );
}
