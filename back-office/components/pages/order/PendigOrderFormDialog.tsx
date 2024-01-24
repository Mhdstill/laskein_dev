import Close from '@mui/icons-material/Close';
import CloseRounded from '@mui/icons-material/CloseRounded';
import Save from '@mui/icons-material/Save';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import OSTextField from 'components/shared/input/OSTextField';
import { Form, Formik } from 'formik';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { createOrder, updateOrder } from 'services/redux/order';
import * as Yup from 'yup';
import KeyValue from '../../shared/KeyValue';
import useFetchOrderListe from './hooks/useFetchOrderListe';
import { MuiContainedButton } from './styles';

type BoxDetailDialogProps = {
  open: boolean;
  /* eslint-disable */
  setOpen: (show: boolean) => void;
};

export default function PendingOrderFormDialog({
  open,
  setOpen,
}: BoxDetailDialogProps) {
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
  const { order, isEditing } = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();
  const fetchOrderList = useFetchOrderListe();

  const handleClickInProgress = async (id: any) => {
    const order: any = {
      status: 'INPROGRESS',
    };
    await dispatch(updateOrder({ id, order }));
    fetchOrderList();
    setOpen(false);
  };

  const handleSubmit = async (values: any) => {
    try {
      if (isEditing) {
        await dispatch(
          updateOrder({
            id: order.id!,
            order: values,
          })
        );
      } else {
        await dispatch(createOrder(values));
      }
      fetchOrderList();
      setOpen(false);
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="md"
      fullWidth
    >
      <Formik
        enableReinitialize
        initialValues={{
          orderNumber: isEditing ? order.orderNumber : '',
        }}
        validationSchema={Yup.object({
          orderNumber: Yup.string().required('Champ obligatoire'),
        })}
        onSubmit={(value: any, action: any) => {
          handleSubmit(value);
          action.resetForm();
          // console.log('valeur ', value);
        }}
      >
        {() => (
          // return (
          <Form>
            <DialogTitle id="alert-dialog-title">
              <div className="w-full flex items-center justify-between">
                <Typography variant="h5" color="primary">
                  Mettre la commande en cours de traitement
                </Typography>
                <MuiContainedButton
                  startIcon={<Close />}
                  variant="contained"
                  color="warning"
                  onClick={() => setOpen(false)}
                  className="bg-orange-400 text-white"
                >
                  Fermer
                </MuiContainedButton>
              </div>
            </DialogTitle>

            <DialogContent>
              <div className="flex lg:flex-row md:flex-row sm:flex-col w-full py-2">
                <div className="h-full p-2.5 w-full flex flex-col gap-2.5 justify-between lg:border-r lg:border-r-gray-100">
                  {/* <KeyValue
                      title="Refence commande"
                      value={order.orderNumber}
                    /> */}
                  {/* <KeyValue
                      title="Date commande"
                      value={
                        order?.createdAt
                          ? formatDate(order?.createdAt)
                          : 'Date non disponible'
                      }
                    /> */}
                  <KeyValue
                    title="Date commande"
                    value={
                      order?.createdAt
                        ? formatDate(new Date(order?.createdAt))
                        : 'Date non disponible'
                    }
                  />

                  <KeyValue
                    title="Refence produit"
                    value={order.shoppingCart?.game?.article?.reference}
                  />
                  <KeyValue
                    title="Email"
                    value={order.shoppingCart?.user?.email}
                  />
                </div>
                <div className="h-full p-2.5 w-full flex flex-col gap-2.5 justify-between lg:border-r lg:border-r-gray-100">
                  <KeyValue
                    title="Adresse"
                    // value={order.shoppingCart?.user?.address?.region}

                    value={`${order.shoppingCart?.user?.address?.region}, ${order.shoppingCart?.user?.address?.firstAdress} , ${order.shoppingCart?.user?.address?.zipCode}`}
                  />
                </div>
                <div className="h-full p-2.5 w-full flex flex-col gap-2.5 justify-between">
                  <OSTextField
                    id="outlined-basic"
                    label="Numero de commande"
                    name="orderNumber"
                  />
                  <TextField
                    variant="outlined"
                    label="Autre information concernant la commande "
                    fullWidth
                    multiline
                    rows={4}
                  />
                </div>
              </div>
            </DialogContent>

            <DialogActions>
              <div className="w-full flex gap-2.5 justify-end px-4">
                <MuiContainedButton
                  variant="contained"
                  color="warning"
                  startIcon={<CloseRounded />}
                  onClick={() => setOpen(false)}
                  className="!bg-orange-500 !normal-case text-white"
                >
                  Annuler
                </MuiContainedButton>

                <MuiContainedButton
                  variant="contained"
                  color="primary"
                  startIcon={<Save />}
                  className="!normal-case bg-[#376F70] text-white"
                  sx={{
                    background: '#376F70',
                  }}
                  onClick={() => handleClickInProgress(order.id)}
                  type="submit"
                >
                  Enregistrer
                </MuiContainedButton>
              </div>
            </DialogActions>
          </Form>
          // );
        )}
      </Formik>
    </Dialog>
  );
}
