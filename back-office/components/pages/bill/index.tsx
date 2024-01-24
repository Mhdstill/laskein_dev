import CloseRounded from '@mui/icons-material/CloseRounded';
import Edit from '@mui/icons-material/Edit';
import Update from '@mui/icons-material/Update';
import { Formik } from 'formik';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import PageTitle from '../../shared/PageTitle';

import TransationDetails from './TransactionDetails';
import TransactionTable from './TransactionTable';
import { MuiContainedButton } from './styles';

export default function BillComponent() {
  const [activeUi, setActiveUi] = React.useState<'none' | 'form' | 'details'>(
    'details'
  );
  return (
    <div className="bg-white h-full py-2.5 w-full">
      <PageTitle
        title1="Liste des transactions"
        title2={activeUi === 'form' ? 'Modification' : 'Liste'}
      />

      <div className="h-[calc(100%_-_58px)]">
        <Scrollbars>
          {activeUi === 'none' ? (
            <div className="flex w-full justify-center items-center text-[#2F435E] text-h5">
              Aucune transaction sélectionnée
            </div>
          ) : (
            <Formik initialValues={{}} onSubmit={() => {}}>
              <>
                <div className="p-2.5 flex w-full">
                  {activeUi === 'form' && <TransationDetails isEditing />}
                  {activeUi === 'details' && <TransationDetails />}
                </div>
                <div className="w-full flex gap-2.5 justify-end">
                  {activeUi === 'form' && (
                    <MuiContainedButton
                      variant="contained"
                      color="warning"
                      startIcon={<CloseRounded />}
                      className="!bg-orange-500 !normal-case text-white"
                    >
                      Annuler
                    </MuiContainedButton>
                  )}

                  {activeUi === 'form' && (
                    <MuiContainedButton
                      variant="contained"
                      color="primary"
                      startIcon={<Update />}
                      className="!normal-case bg-[#376F70] text-white"
                      sx={{
                        background: '#376F70',
                      }}
                      onClick={() => setActiveUi('details')}
                    >
                      Mettre a jour
                    </MuiContainedButton>
                  )}

                  {activeUi === 'details' && (
                    <MuiContainedButton
                      variant="contained"
                      color="primary"
                      startIcon={<Edit />}
                      className="normal-case bg-[#376F70] text-white"
                      onClick={() => setActiveUi('form')}
                    >
                      Editer
                    </MuiContainedButton>
                  )}
                </div>
              </>
            </Formik>
          )}
          <div className="w-full h-[1px] bg-gray-300 my-2"></div>
          <TransactionTable />
        </Scrollbars>
      </div>
    </div>
  );
}
