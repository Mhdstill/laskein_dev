import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import Visibility from '@mui/icons-material/Visibility';

import Article from '@mui/icons-material/Article';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import { DatePicker } from '@mui/x-date-pickers';
import classNames from 'classnames';
import * as React from 'react';

interface Data {
  ref: string;
  bank: string;
  date: string;
  userEmail: string;
  amount: number;
  status: 'PENDING' | 'VALIDATED' | 'RESETED';
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'EXCHANGE' | 'PURCHASE';
}

function createData(
  ref: string,
  bank: string,
  date: string,
  userEmail: string,
  amount: number,
  status: 'PENDING' | 'VALIDATED' | 'RESETED',
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'EXCHANGE' | 'PURCHASE'
): Data {
  return {
    ref,
    bank,
    date,
    userEmail,
    amount,
    status,
    type,
  };
}

const rows: Data[] = [
  createData(
    'REF_001',
    'Paypal',
    '10/10/2022 - 10:10',
    'user@gmail.com',
    99.99,
    'PENDING',
    'DEPOSIT'
  ),
  createData(
    'REF_002',
    'Stripe',
    '10/10/2022 - 10:10',
    'user@gmail.com',
    99.99,
    'RESETED',
    'EXCHANGE'
  ),
  createData(
    'REF_003',
    'Mastercard',
    '10/10/2022 - 10:10',
    'user@gmail.com',
    99.99,
    'VALIDATED',
    'PURCHASE'
  ),
  createData(
    'REF_004',
    'Visa card',
    '10/10/2022 - 10:10',
    'user@gmail.com',
    99.99,
    'VALIDATED',
    'WITHDRAWAL'
  ),
  createData(
    'REF_005',
    'Paypal',
    '10/10/2022 - 10:10',
    'user@gmail.com',
    99.99,
    'PENDING',
    'DEPOSIT'
  ),
  createData(
    'REF_006',
    'Paypal',
    '10/10/2022 - 10:10',
    'user@gmail.com',
    99.99,
    'RESETED',
    'PURCHASE'
  ),
  createData(
    'REF_007',
    'Paypal',
    '10/10/2022 - 10:10',
    'user@gmail.com',
    99.99,
    'RESETED',
    'WITHDRAWAL'
  ),
  createData(
    'REF_008',
    'Paypal',
    '10/10/2022 - 10:10',
    'user@gmail.com',
    99.99,
    'PENDING',
    'EXCHANGE'
  ),
  createData(
    'REF_009',
    'Paypal',
    '10/10/2022 - 10:10',
    'user@gmail.com',
    99.99,
    'PENDING',
    'DEPOSIT'
  ),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  /* eslint-disable */
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'bank',
    numeric: false,
    disablePadding: true,
    label: 'Banque',
  },
  {
    id: 'date',
    numeric: true,
    disablePadding: false,
    label: 'Date',
  },
  {
    id: 'userEmail',
    numeric: false,
    disablePadding: false,
    label: 'Email utilisateur',
  },
  {
    id: 'amount',
    numeric: false,
    disablePadding: false,
    label: 'Montant',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Statut',
  },
  {
    id: 'type',
    numeric: false,
    disablePadding: false,
    label: 'Type',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'left'}
            padding={'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell padding="normal">Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar() {
  return (
    <div className="p-2.5 row flex lg:flex-row md:flex-row sm:flex-col w-full justify-between items-center lg:gap-10 md:gap-2 sm:gap-2">
      <div className="w-full">
        <Button
          variant="outlined"
          color="primary"
          className="!normal-case h-full text-[#376F70] border border-[#376F70] hover:border-[#376F70]"
          startIcon={<Article />}
        >
          Imprimer
        </Button>
      </div>
      <div className="w-full flex lg:flex-row md:flex-row sm:flex-col gap-2.5">
        <DatePicker
          label="Date début"
          format="DD/MM/YYYY"
          slotProps={{ textField: { size: 'small' } }}
        />
        <DatePicker
          label="Date fin"
          format="DD/MM/YYYY"
          slotProps={{ textField: { size: 'small' } }}
        />
      </div>
    </div>
  );
}

export default function TransactionTable() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('bank');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n: Data) => n.bank);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort<Data | any>(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table aria-labelledby="tableTitle" size={'small'}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row: Data, index) => {
                const isItemSelected = isSelected(row.ref as string);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.ref as string)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.ref}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell component="th" id={labelId} scope="row">
                      {row.bank}
                    </TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.userEmail}</TableCell>
                    <TableCell>{row.amount}$</TableCell>
                    <TableCell>
                      <div
                        className={classNames(
                          'text-[12px] leading-5 w-full flex p-1 rounded-full justify-center text-white',
                          row.status === 'PENDING'
                            ? 'bg-[#376F70]'
                            : row.status === 'VALIDATED'
                            ? 'bg-[#2E7D32]'
                            : 'bg-[#FB8C00]'
                        )}
                      >
                        {row.status === 'PENDING'
                          ? 'En attente'
                          : row.status === 'VALIDATED'
                          ? 'Validé'
                          : 'Annulé'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div
                        className={classNames(
                          'text-[12px] leading-5 w-full border flex p-1 rounded-full justify-center font-bold',
                          row.type === 'DEPOSIT'
                            ? 'border-[#2F435E] text-[#2F435E]'
                            : row.type === 'WITHDRAWAL'
                            ? 'border-[#FBA048] text-[#FBA048]'
                            : row.type === 'EXCHANGE'
                            ? 'border-[#00a364] text-[#00a364]'
                            : 'border-[#99fb48] text-[#99fb48]'
                        )}
                      >
                        {row.type === 'DEPOSIT'
                          ? 'Dépôt'
                          : row.type === 'WITHDRAWAL'
                          ? 'Retrait'
                          : row.type === 'EXCHANGE'
                          ? 'Echange'
                          : 'Achat'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 w-[90px]">
                        <IconButton size="small">
                          <Visibility />
                        </IconButton>
                        <IconButton size="small" color="secondary">
                          <Edit />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          className="text-red-500"
                        >
                          <Delete />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
