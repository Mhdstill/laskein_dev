import React, { useEffect, useState } from 'react';

import Article from '@mui/icons-material/Article';
import Mail from '@mui/icons-material/Mail';
import Message from '@mui/icons-material/Message';
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
import TextField from '@mui/material/TextField';
import { visuallyHidden } from '@mui/utils';
import TableLoading from 'components/shared/loading/TableLoading';
import EnhancedTableToolbar from 'components/shared/table/Toolbar';
import PatronageDTO from 'data/dto/Patronage.dto';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import { useAppSelector } from 'services/redux/hooks';
import useFetchPatronageListe from './hooks/useFetchPatronageList';

interface Data {
  email: string;
  subscription: string;
  totalReferal: number;
  discountPercentage: number;
  lastConnectionDate: string;
}

function createData(
  email: string,
  subscription: string,
  totalReferal: number,
  discountPercentage: number,
  lastConnectionDate: string
): Data {
  return {
    email,
    subscription,
    totalReferal,
    discountPercentage,
    lastConnectionDate,
  };
}

const rows: Data[] = [
  createData('test@gmail.com', 'basic', 12, 10, '10/10/2022 à 10:00'),
  createData('test2@gmail.com', 'junior', 12, 5, '10/10/2022 à 10:00'),
  createData('test3@gmail.com', 'expert', 12, 3, '10/10/2022 à 10:00'),
  createData('test4@gmail.com', 'vip', 12, 4, '10/10/2022 à 10:00'),
  createData('test5@gmail.com', 'vip', 12, 15, '10/10/2022 à 10:00'),
  createData('test6@gmail.com', 'junior', 12, 27, '10/10/2022 à 10:00'),
  createData('test7@gmail.com', 'expert', 12, 11, '10/10/2022 à 10:00'),
  createData('test8@gmail.com', 'basic', 12, 15, '10/10/2022 à 10:00'),
  createData('test9@gmail.com', 'basic', 12, 1, '10/10/2022 à 10:00'),
  createData('test10@gmail.com', 'expert', 12, 19, '10/10/2022 à 10:00'),
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
  id: keyof PatronageDTO;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'userParent',
    numeric: false,
    disablePadding: true,
    label: 'Email',
  },
  {
    id: 'userParent',
    numeric: false,
    disablePadding: false,
    label: "Type d'bonnement",
  },
  // {
  //   id: 'totalReferal',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Total filleul',
  // },
  {
    id: 'discountPercentage',
    numeric: true,
    disablePadding: false,
    label: 'Pourcentage de reduction %',
  },
  {
    id: 'bonusEndDate',
    numeric: false,
    disablePadding: false,
    label: 'Date de dernier connexion',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof PatronageDTO
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof PatronageDTO) => (event: React.MouseEvent<unknown>) => {
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

export default function SponsorshipReward() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] =
    React.useState<keyof PatronageDTO>('userParent');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { patronageList, loading } = useAppSelector((state) => state.patronage);
  const fetchPatronageList = useFetchPatronageListe();
  const router = useRouter();
  const [key, setKey] = useState<any>('');

  useEffect(() => {
    fetchPatronageList();
  }, [router.query]);

  React.useEffect(() => {
    if (router?.query?.search) {
      setKey(router.query.search);
    }
  }, [router.query.search]);

  const search = (key: string) => {
    const query = { ...router.query, search: key };
    router.push({
      pathname: router.pathname,
      query: query,
    });
  };
  const deboncedSearch = React.useCallback(debounce(search, 300), [
    router.query,
  ]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKey(event.target.value);
    deboncedSearch(event.target.value);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof PatronageDTO
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.email);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - patronageList.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort<PatronageDTO | any>(
        patronageList,
        getComparator(order, orderBy)
      ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [patronageList, order, orderBy, page, rowsPerPage]
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar>
          <div className="p-2.5 row flex w-full justify-between items-center gap-10">
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

            <TextField
              label="Recherche"
              variant="outlined"
              size="small"
              fullWidth
              value={key}
              onChange={handleChange}
            />
          </div>
        </EnhancedTableToolbar>
        <TableContainer>
          {loading && <TableLoading />}
          <Table aria-labelledby="tableTitle" size={'small'}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={patronageList.length}
            />
            <TableBody>
              {visibleRows.map((row: PatronageDTO, index) => {
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
                      {row.userParent?.email}
                    </TableCell>
                    <TableCell>
                      {row.userChild?.subscription?.offer?.name}
                      {/* <div
                        className={classNames(
                          'text-[12px] leading-5 w-full border flex p-1 rounded-full justify-center',
                          row.userParent?.subscription?.offer?.name === 'basic'
                            ? 'border-[#D2339B] text-[#D2339B]'
                            : row.userParent?.subscription?.offer?.name ===
                              'junior'
                            ? 'border-[#33B063] text-[#33B063]'
                            : row.userParent?.subscription?.offer?.name ===
                              'expert'
                            ? 'border-[#7F33AF] text-[#7F33AF]'
                            : 'border-[#FBA048] text-[#FBA048]'
                        )}
                      >
                        {row.userParent?.subscription?.offer?.name === 'basic'
                          ? 'Basique'
                          : row.userParent?.subscription?.offer?.name ===
                            'junior'
                          ? 'Débutant'
                          : row.userParent?.subscription?.offer?.name ===
                            'expert'
                          ? 'Expert'
                          : 'V.I.P'}
                      </div> */}
                    </TableCell>
                    {/* <TableCell>{row.totalReferal}</TableCell> */}
                    <TableCell>{row.discountPercentage}</TableCell>
                    <TableCell>
                      {new Date(row?.bonusEndDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" color="info">
                        <Message />
                      </IconButton>
                      <IconButton size="small" color="primary">
                        <Mail />
                      </IconButton>
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
          count={patronageList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={labelRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export const labelRowsPerPage = 'Ligne(s) par page';
