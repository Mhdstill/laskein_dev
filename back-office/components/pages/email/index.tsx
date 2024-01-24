import React from 'react';

import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Scrollbars from 'react-custom-scrollbars-2';
import SendFormDialog from './SendFormDialog';
import EmailTable from './Table';

export default function EmailComponent() {
  // const [actieUi, setActiveUi] = React.useState<
  //   'inbox' | 'sent' | 'stared' | 'scheduled' | 'trash' | 'spam'
  // >('inbox');

  const [showMailForm, setShowMailForm] = React.useState<boolean>(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  return (
    <div className="w-full h-full p-2.5 bg-white gap-2.5 flex-col lg:flex-row md:flex-row sm:flex-col">
      {/* <div
        className={classNames(
          'bg-[#376F70]',
          'lg:py-2.5 md:py-2.5 sm:py-0',
          'lg:h-full md:h-full sm:h-auto',
          'lg:w-[230px] md:w-[230px] sm:w-full lg:min-w-[230px] md:min-w-[230px] sm:min-w-[230px]',
          'lg:block md:block sm:flex',
          'sm:overflow-auto'
        )}
      >
        <SidebarItem
          icon={<Inbox />}
          title="Boîte de réception"
          badge="4"
          onClick={() => setActiveUi('inbox')}
          isActive={actieUi === 'inbox'}
        />
        <SidebarItem
          icon={<Send />}
          title="Message envoyés"
          onClick={() => setActiveUi('sent')}
          isActive={actieUi === 'sent'}
        />
        <SidebarItem
          icon={<Star />}
          title="Message suivis"
          onClick={() => setActiveUi('stared')}
          isActive={actieUi === 'stared'}
        />
        <SidebarItem
          icon={<Schedule />}
          title="En attente"
          onClick={() => setActiveUi('scheduled')}
          isActive={actieUi === 'scheduled'}
        />
        <SidebarItem
          icon={<Drafts />}
          title="Brouillons"
          onClick={() => setActiveUi('trash')}
          isActive={actieUi === 'trash'}
        />
        <SidebarItem
          icon={<Error />}
          title="Spam"
          onClick={() => setActiveUi('spam')}
          isActive={actieUi === 'spam'}
        />
      </div> */}
      <div className="flex w-full items-center justify-between">
        <Typography variant="h5">Liste des emails </Typography>
        <div className="flex gap-8 justify-end items-center">
          <div className="flex gap-2 items-center">
            <p>Nombre d&apos;élément par page</p>
            <select
              name="rowPerPage"
              id="rowPerPage"
              value={rowsPerPage}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                setRowsPerPage(() => Number(event?.target?.value));
              }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
          <div className="flex gap-2 items-center">
            <IconButton
              size="small"
              onClick={() => {
                if (page < 1) setPage(0);
                else {
                  setPage(() => page - 1);
                }
              }}
            >
              <ChevronLeft />
            </IconButton>
            <div>{page + 1}</div>
            <IconButton
              size="small"
              onClick={() => {
                setPage(() => page + 1);
              }}
            >
              <ChevronRight />
            </IconButton>
          </div>
        </div>
      </div>

      <div className="border border-gray-100 w-full h-[calc(100%_-_50px)] flex flex-col">
        {/* <div className="p-2.5 border-b border-b-gray-100 flex justify-between">
          <MuiContainedButton
            variant="contained"
            color="secondary"
            className="bg-[#376F70]"
            startIcon={<Add />}
            onClick={() => setShowMailForm(true)}
          >
            Nouveau
          </MuiContainedButton>

          <TextField
            variant="outlined"
            size="small"
            placeholder="Recherche"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search className="text-gray-400" />
                </InputAdornment>
              ),
            }}
          />
        </div> */}
        <Scrollbars>
          <EmailTable page={page} rowsPerPage={rowsPerPage} />
        </Scrollbars>

        <SendFormDialog open={showMailForm} setOpen={setShowMailForm} />
      </div>
    </div>
  );
}
