import React from 'react';

import Checkbox from '@mui/material/Checkbox';
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

function createData(ref: string, permission: string) {
  return { ref, permission };
}

const rows = [
  createData('REF_01', 'Create:model1'),
  createData('REF_02', 'Create:model1'),
  createData('REF_03', 'Create:model1'),
  createData('REF_04', 'Create:model1'),
  createData('REF_05', 'Create:model1'),
];

export default function SelectedPermissionTable() {
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

  return (
    <div className="bg-white w-full">
      <div className="flex flex-col gap-2 p-2.5">
        <div className="flex w-full justify-between">
          <Typography variant="body1" color="primary">
            Liste des persmission dans le role Administrateur
          </Typography>
        </div>
        <div className="w-full flex gap-2.5 justify-end items-center">
          <TextField
            name="searchField"
            variant="outlined"
            size="small"
            label="Recherche"
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
              <TableCell>Permission</TableCell>
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
                  {row.permission}
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
    </div>
  );
}
