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
import OuterTransactionDTO from 'data/dto/Transaction.dto';
import { useConfirm } from 'material-ui-confirm';
import moment from 'moment';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import {
  deleteOuterTransaction,
  editOuterTransaction,
} from 'services/redux/outerTransation';
import useFetchOuterTransactionList from './hooks/useFetchOuterTransactionList';

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
  id: keyof OuterTransactionDTO;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'bankId',
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
    property: keyof OuterTransactionDTO
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof OuterTransactionDTO) =>
    (event: React.MouseEvent<unknown>) => {
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
      <div className="w-full"></div>
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

type TransactionOuterTableProps = {
  setOuterTransaction: React.Dispatch<
    React.SetStateAction<OuterTransactionDTO | undefined>
  >;
};

export default function TransactionOuterTable({
  setOuterTransaction,
}: TransactionOuterTableProps) {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] =
    React.useState<keyof OuterTransactionDTO>('bank');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch = useAppDispatch();
  const fetchOuterTransactionList = useFetchOuterTransactionList();
  const confirm = useConfirm();

  const { outerTransactionList, reloadOuterTransactionList } = useAppSelector(
    (state) => state.outerTransaction
  );

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof OuterTransactionDTO
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = outerTransactionList.map(
        (n: OuterTransactionDTO) => n.id as string
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
      ? Math.max(0, (1 + page) * rowsPerPage - outerTransactionList.length)
      : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort<OuterTransactionDTO | any>(
        outerTransactionList,
        getComparator(order, orderBy)
      ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [outerTransactionList, order, orderBy, page, rowsPerPage]
  );

  React.useEffect(() => {
    fetchOuterTransactionList();
  }, [reloadOuterTransactionList]);

  const handleclickDelete = async (id: any) => {
    confirm({
      title: 'Supprimer la transaction',
      description: 'Voulez-vous vraiment supprimer cette transaction ?',
      cancellationText: 'Annuler',
      confirmationText: 'Supprimer',
      cancellationButtonProps: {
        color: 'warning',
      },
      confirmationButtonProps: {
        color: 'error',
      },
    })
      .then(async () => {
        await dispatch(deleteOuterTransaction({ id }));
        fetchOuterTransactionList();
      })
      .catch(() => {});
  };

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
              rowCount={outerTransactionList.length}
            />
            <TableBody>
              {visibleRows.map((row: OuterTransactionDTO, index) => {
                const isItemSelected = isSelected(row.id as string);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id as string)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell component="th" id={labelId} scope="row">
                      {row?.bank ? row?.bank?.accountNumber : 'Non définie'}
                    </TableCell>
                    <TableCell>
                      {moment(String(row.date)).format('DD/MM/YYYY à hh:mm:ss')}
                    </TableCell>
                    <TableCell>
                      {row?.wallet?.user?.email ?? 'No définie'}
                    </TableCell>
                    <TableCell>{row.amount}$</TableCell>
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
                            'border-[#FBA048] text-[#FBA048]'
                        )}
                      >
                        {row.type === 'DEPOSIT'
                          ? 'Dépôt'
                          : row.type === 'WITHDRAWAL'
                          ? 'Retrait'
                          : 'Non définie'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 w-[90px]">
                        <IconButton
                          size="small"
                          color="secondary"
                          onClick={() => {
                            setOuterTransaction(row);
                            dispatch(
                              editOuterTransaction({
                                id: row?.id as string,
                                args: {},
                              })
                            );
                          }}
                        >
                          <Visibility />
                        </IconButton>
                        {/* <IconButton
                          size="small"
                          color="error"
                          className="text-red-500"
                          onClick={() => {
                            handleclickDelete(row?.id as string);
                          }}
                        >
                          <Delete />
                        </IconButton> */}
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
          count={outerTransactionList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
