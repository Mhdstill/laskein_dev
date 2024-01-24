import CloseRounded from '@mui/icons-material/CloseRounded';
import Edit from '@mui/icons-material/Edit';
import Update from '@mui/icons-material/Update';
import OSSelectField from 'components/shared/select/OSSelectField';
import { TRANSACTION_STATUS } from 'data/constant';
import { Form, Formik, FormikValues } from 'formik';
import moment from 'moment';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { editTransaction, updateTransaction } from 'services/redux/transaction';
import { cancelEditTransaction } from 'services/redux/transaction/transactionSlice';
import KeyValue from '../../shared/KeyValue';
import useFetchTransactionList from './hooks/useFetchTransactionList';
import { MuiContainedButton } from './styles';

export default function TransationDetails() {
  const dispatch = useAppDispatch();
  const { transaction, isEditing } = useAppSelector(
    (state) => state.transaction
  );
  let [transactionType, setTransactionStatus] = React.useState<string>('');

  const fetchTransactionList = useFetchTransactionList();

  React.useEffect(() => {
    if (transaction.type === 'DEPOSIT') setTransactionStatus('Dépôt');
    else if (transaction.type === 'EXCHANGE') setTransactionStatus('Echange');
    else if (transaction.type === 'WITHDRAWAL') setTransactionStatus('Retrait');
    else setTransactionStatus('Achat');
  }, [transaction]);

  return (
    <div className="flex flex-col w-full">
      <div className="lg:flex lg:flex-row md:flex-row md:flex sm:flex sm:flex-col-reverse sm:items-center w-full">
        <div className="h-full p-2.5 w-full flex flex-col gap-2.5 justify-between border-r border-r-gray-100">
          <KeyValue title="Identifiant" value={transaction?.id ?? ''} />
          <KeyValue
            title="Nom"
            value={
              (transaction?.wallet?.user?.lastName ?? '') +
              ' ' +
              (transaction?.wallet?.user?.firstName ?? '')
            }
          />
          <KeyValue
            title="Email"
            value={transaction?.wallet?.user?.email ?? 'Non définie'}
          />
          <KeyValue
            title="Téléphone"
            value={transaction?.wallet?.user?.phone ?? 'Non définie'}
          />
          <KeyValue
            title="Adresse"
            value={transaction?.wallet?.user?.address ?? ''}
          />
        </div>

        <div className="h-full p-2.5 w-full flex flex-col gap-2.5 justify-between border-r border-r-gray-100">
          <KeyValue title="N° transaction" value={transaction?.id} />
          <KeyValue
            title="Date"
            value={moment(transaction?.date).format('DD/MM/YYYY')}
          />
          <KeyValue
            title="Banque"
            value={transaction?.bank?.name ?? 'Non définie'}
          />
          <KeyValue
            title="Montant"
            value={transaction?.amount ?? 'Non définie'}
          />
          <KeyValue title="Type" value={transactionType} />
        </div>

        <div className="p-2.5 w-full h-full items-start flex">
          {isEditing && (
            <Formik
              initialValues={{
                status: isEditing ? transaction.status : '',
              }}
              enableReinitialize
              onSubmit={async (values: FormikValues) => {
                await dispatch(
                  updateTransaction({
                    id: transaction?.id as string,
                    transaction: {
                      status: values.status,
                    },
                  })
                );
                await fetchTransactionList();
              }}
            >
              {(formikProps) => (
                <Form className="p-2.5 w-full h-full items-start flex flex-col gap-2">
                  <OSSelectField
                    id="status"
                    name="status"
                    label="Statut"
                    dataKey="desc"
                    valueKey="id"
                    options={TRANSACTION_STATUS}
                  />
                  <div className="w-full flex gap-2.5 justify-end">
                    <MuiContainedButton
                      size="small"
                      variant="contained"
                      color="warning"
                      startIcon={<CloseRounded />}
                      className="!bg-orange-500 !normal-case text-white"
                      onClick={() => {
                        dispatch(cancelEditTransaction());
                        formikProps.resetForm();
                      }}
                    >
                      Annuler
                    </MuiContainedButton>
                    <MuiContainedButton
                      size="small"
                      variant="contained"
                      color="primary"
                      startIcon={<Update />}
                      className="!normal-case bg-[#376F70] text-white"
                      sx={{
                        background: '#376F70',
                      }}
                      type="submit"
                    >
                      Mettre a jour
                    </MuiContainedButton>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
      <div className="w-full flex gap-2.5 justify-end">
        {Object.keys(transaction).length > 0 && !isEditing && (
          <MuiContainedButton
            variant="contained"
            color="primary"
            startIcon={<Edit />}
            className="normal-case bg-[#376F70] text-white"
            onClick={() =>
              dispatch(
                editTransaction({
                  id: transaction?.id,
                })
              )
            }
          >
            Editer
          </MuiContainedButton>
        )}
      </div>{' '}
    </div>
  );
}
