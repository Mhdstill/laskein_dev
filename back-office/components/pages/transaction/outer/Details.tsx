import CloseRounded from '@mui/icons-material/CloseRounded';
import Edit from '@mui/icons-material/Edit';
import Update from '@mui/icons-material/Update';
import OSSelectField from 'components/shared/select/OSSelectField';
import { Form, Formik, FormikValues } from 'formik';
import moment from 'moment';
import React from 'react';

import { TRANSACTION_STATUS } from 'data/constant';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import {
  editOuterTransaction,
  updateOuterTransaction,
} from 'services/redux/outerTransation';
import { cancelEditOuterTransaction } from 'services/redux/outerTransation/outerTransactionSlice';
import KeyValue from '../../../shared/KeyValue';
import useFetchOuterTransactionList from './hooks/useFetchOuterTransactionList';
import { MuiContainedButton } from './styles';

export default function OuterTransationDetails() {
  const dispatch = useAppDispatch();
  const { outerTransaction, isEditing } = useAppSelector(
    (state) => state.outerTransaction
  );
  let [transactionType, setTransactionStatus] = React.useState<string>('');

  const fetchOuterTransactionList = useFetchOuterTransactionList();

  React.useEffect(() => {
    if (outerTransaction.type === 'DEPOSIT') setTransactionStatus('Dépôt');
    else if (outerTransaction.type === 'WITHDRAWAL')
      setTransactionStatus('Retrait');
    else setTransactionStatus('Non définie');
  }, [outerTransaction]);

  return (
    <div className="flex flex-col w-full">
      <div className="lg:flex lg:flex-row md:flex-row md:flex sm:flex sm:flex-col-reverse sm:items-center w-full">
        <div className="h-full p-2.5 w-full flex flex-col gap-2.5 justify-between border-r border-r-gray-100">
          <KeyValue title="Identifiant" value={outerTransaction?.id ?? ''} />
          <KeyValue
            title="Nom"
            value={
              (outerTransaction?.user?.lastName ?? '') +
              ' ' +
              (outerTransaction?.user?.firstName ?? '')
            }
          />
          <KeyValue
            title="Email"
            value={outerTransaction?.user?.email ?? 'Non définie'}
          />
          <KeyValue
            title="Téléphone"
            value={outerTransaction?.user?.phone ?? 'Non définie'}
          />
          <KeyValue
            title="Adresse"
            value={outerTransaction?.user?.address ?? ''}
          />
        </div>

        <div className="h-full p-2.5 w-full flex flex-col gap-2.5 justify-between border-r border-r-gray-100">
          <KeyValue title="N° transaction" value={outerTransaction?.id} />
          <KeyValue
            title="Date"
            value={moment(outerTransaction?.date).format('DD/MM/YYYY')}
          />
          <KeyValue
            title="Banque"
            value={outerTransaction?.sourceId ?? 'Non définie'}
          />
          <KeyValue
            title="Montant"
            value={outerTransaction?.amount ?? 'Non définie'}
          />
          <KeyValue title="Type" value={transactionType} />
        </div>

        {outerTransaction?.type === 'WITHDRAWAL' && (
          <div className="p-2.5 w-full h-full items-start flex">
            {isEditing && (
              <Formik
                initialValues={{
                  status: isEditing ? outerTransaction?.status : '',
                }}
                enableReinitialize
                onSubmit={async (values: FormikValues) => {
                  await dispatch(
                    updateOuterTransaction({
                      id: outerTransaction?.id as string,
                      transaction: {
                        status: values.status,
                      },
                    })
                  );
                  fetchOuterTransactionList();
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
                          dispatch(cancelEditOuterTransaction());
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
        )}
      </div>
      {outerTransaction?.type === 'WITHDRAWAL' && (
        <div className="w-full flex gap-2.5 justify-end">
          {Object.keys(outerTransaction).length > 0 && !isEditing && (
            <MuiContainedButton
              variant="contained"
              color="primary"
              startIcon={<Edit />}
              className="normal-case bg-[#376F70] text-white"
              onClick={() =>
                dispatch(
                  editOuterTransaction({
                    id: outerTransaction?.id,
                  })
                )
              }
            >
              Editer
            </MuiContainedButton>
          )}
        </div>
      )}
    </div>
  );
}
