import React from 'react';

import Close from '@mui/icons-material/Close';

import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ArticleDetails from '../../../article/articles/ArticleDetails';
import { MuiContainedButton } from './styles';

function createData(ref: string, model: string) {
  return { ref, model };
}

const rows = [
  createData('REF_01', 'Create:model1'),
  createData('REF_02', 'Create:model1'),
  createData('REF_03', 'Create:model1'),
  createData('REF_04', 'Create:model1'),
  createData('REF_05', 'Create:model1'),
];

export default function AvalaibleModelTable() {
  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="bg-white w-full">
      <div className="flex flex-col gap-2 p-2.5">
        <Typography variant="body1" color="primary">
          Liste des model disponibles
        </Typography>

        <div className="w-full flex gap-2.5 justify-end">
          <TextField
            name="searchfield"
            variant="outlined"
            size="small"
            label="Rechercher"
          />
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-300 my-2"></div>

      <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
        <Table aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  inputProps={{
                    'aria-label': 'select all desserts',
                  }}
                />
              </TableCell>
              <TableCell>Référence</TableCell>
              <TableCell>Model</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.ref}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    // checked={isItemSelected}
                    inputProps={
                      {
                        // 'aria-labelledby': labelId,
                      }
                    }
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.ref}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.model}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={100}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xl"
      >
        <DialogTitle id="alert-dialog-title">
          <div className="w-full flex items-center justify-between">
            <Typography variant="h5" color="primary">
              Details du Produit
            </Typography>
            <MuiContainedButton
              startIcon={<Close />}
              variant="contained"
              color="warning"
              onClick={handleClose}
              className="bg-orange-400 text-white"
            >
              Fermer
            </MuiContainedButton>
          </div>
        </DialogTitle>
        <ArticleDetails />
      </Dialog>
    </div>
  );
}
