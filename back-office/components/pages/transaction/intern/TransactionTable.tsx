import Visibility from '@mui/icons-material/Visibility';

import Box from '@mui/material/Box';
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
import TransactionDTO from 'data/dto/Transaction.dto';
import { useConfirm } from 'material-ui-confirm';
import moment from 'moment';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { editTransaction } from 'services/redux/transaction';
import useFetchTransactionList from './hooks/useFetchTransactionList';

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
  id: keyof TransactionDTO;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  // {
  //   id: 'bankId',
  //   numeric: false,
  //   disablePadding: true,
  //   label: 'Banque',
  // },
  {
    id: 'date',
    numeric: true,
    disablePadding: false,
    label: 'Date',
  },
  {
    id: 'walletId',
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
    property: keyof TransactionDTO
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof TransactionDTO) => (event: React.MouseEvent<unknown>) => {
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

export default function TransactionTable() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof TransactionDTO>('bank');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch = useAppDispatch();
  const startDateRef = React.useRef(null);
  const endDateRef = React.useRef(null);
  const [startDate, setStartDate] = React.useState<string | undefined | null>(
    null
  );
  const [endDate, setEndDate] = React.useState<string | undefined | null>(null);
  const fetchTransactionList = useFetchTransactionList(
    startDate as string,
    endDate as string
  );
  const confirm = useConfirm();

  const { transactionList, reloadTransactionList } = useAppSelector(
    (state) => state.transaction
  );

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof TransactionDTO
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = transactionList.map(
        (n: TransactionDTO) => n.id as string
      );
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
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - transactionList.length)
      : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort<TransactionDTO | any>(
        transactionList,
        getComparator(order, orderBy)
      ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [transactionList, order, orderBy, page, rowsPerPage]
  );

  React.useEffect(() => {
    fetchTransactionList();
  }, [dispatch, reloadTransactionList, startDate, endDate]);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <div className="p-2.5 row flex lg:flex-row md:flex-row sm:flex-col w-full justify-between items-center lg:gap-10 md:gap-2 sm:gap-2">
          <div className="w-full flex justify-end items-center">
            {/* {startDate ||
              (endDate && (
                <IconButton
                  size="small"
                  onClick={() => {
                    if (startDateRef) setStartDate(null);
                    else if (endDate) setEndDate(null);
                  }}
                >
                  <Cancel />
                </IconButton>
              ))} */}
          </div>
          <div className="w-full flex lg:flex-row md:flex-row sm:flex-col gap-2.5">
            <DatePicker
              label="Date début"
              format="DD/MM/YYYY"
              slotProps={{ textField: { size: 'small' } }}
              value={startDate}
              onChange={(date) => {
                if (date != null) setStartDate(date as string);
              }}
            />
            <DatePicker
              label="Date fin"
              format="DD/MM/YYYY"
              value={startDate}
              onChange={(date) => {
                if (date != null) setEndDate(date as string);
              }}
            />
          </div>
        </div>
        <TableContainer>
          <Table aria-labelledby="tableTitle" size={'small'}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={transactionList.length}
            />
            <TableBody>
              {visibleRows.map((row: TransactionDTO, index) => {
                const isItemSelected = isSelected(row.id as string);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id as string)}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      className="hidden"
                    >
                      {/* {row?.bank ? row?.bank?.accountNumber : 'Non définie'} */}
                      <input type="checkbox" name="" id="" />
                    </TableCell>
                    <TableCell>
                      {moment(String(row.date)).format('DD/MM/YYYY à hh:mm:ss')}
                    </TableCell>
                    <TableCell>{row?.wallet?.user?.email}</TableCell>
                    <TableCell>{row.amount} €</TableCell>
                    <TableCell>
                      <div
                        className={classNames(
                          'text-[12px] leading-5 w-full flex p-1 rounded-full justify-center text-white',
                          row.status === 'PENDING'
                            ? 'bg-[#376F70]'
                            : row.status === 'APPROVED'
                            ? 'bg-[#2E7D32]'
                            : 'bg-[#FB8C00]'
                        )}
                      >
                        {row.status === 'PENDING'
                          ? 'En attente'
                          : row.status === 'APPROVED'
                          ? 'Approuvé'
                          : 'Annulé'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div
                        className={classNames(
                          'text-[12px] leading-5 w-full border flex p-1 rounded-full justify-center font-bold',
                          row.type === 'DEPOSIT' &&
                            'border-[#2F435E] text-[#2F435E]',
                          row.type === 'WITHDRAWAL' &&
                            'border-[#FBA048] text-[#FBA048]',
                          row.type === 'EXCHANGE'
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
                        <IconButton
                          size="small"
                          color="secondary"
                          onClick={() => {
                            dispatch(
                              editTransaction({
                                id: row?.id as string,
                                args: {
                                  include: {
                                    bank: true,
                                    wallet: {
                                      include: {
                                        user: {
                                          include: {
                                            address: true,
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                              })
                            );
                          }}
                        >
                          <Visibility />
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
          count={transactionList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
