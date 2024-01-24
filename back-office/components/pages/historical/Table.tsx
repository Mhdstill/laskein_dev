import React, { useEffect, useState } from 'react';

import { Search } from '@mui/icons-material';
import {
  Badge,
  InputAdornment,
  TablePagination,
  TextField,
} from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import { DatePicker } from '@mui/x-date-pickers';
import TableLoading from 'components/shared/loading/TableLoading';
import EnhancedTableToolbar from 'components/shared/table/Toolbar';
import HistoricalDTO from 'data/dto/Historical.dto';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import { useAppSelector } from 'services/redux/hooks';
import useFetchHistoricalList from './hooks/useFetchHistoricalList';

interface Data {
  ref: string;
  email: string;
  action: string;
  description: string;
  date: string;
}

function createData(
  ref: string,
  email: string,
  action: string,
  description: string,
  date: string
): Data {
  return {
    ref,
    email,
    action,
    description,
    date,
  };
}

const rows: Data[] = [
  createData(
    'REF-G0001',
    'test@gmail.com',
    'Création',
    'Lorem ipsum dolor sit amuet, consectetur adipiscing elt.',
    '10/10/2023 - 10:10:23'
  ),
  createData(
    'REF-G0002',
    'test@gmail.com',
    'Suppression',
    'Lorem ipsum dolor sit amuet, consectetur adipiscing elt.',
    '10/10/2023 - 10:10:23'
  ),
  createData(
    'REF-G0003',
    'test@gmail.com',
    'Modification',
    'Lorem ipsum dolor sit amuet, consectetur adipiscing elt.',
    '10/10/2023 - 10:10:23'
  ),
  createData(
    'REF-G0004',
    'test@gmail.com',
    'Création',
    'Lorem ipsum dolor sit amuet, consectetur adipiscing elt.',
    '10/10/2023 - 10:10:23'
  ),
  createData(
    'REF-G0005',
    'test@gmail.com',
    'Création',
    'Lorem ipsum dolor sit amuet, consectetur adipiscing elt.',
    '10/10/2023 - 10:10:23'
  ),
  createData(
    'REF-G0006',
    'test@gmail.com',
    'Création',
    'Lorem ipsum dolor sit amuet, consectetur adipiscing elt.',
    '10/10/2023 - 10:10:23'
  ),
  createData(
    'REF-G0007',
    'test@gmail.com',
    'Création',
    'Lorem ipsum dolor sit amuet, consectetur adipiscing elt.',
    '10/10/2023 - 10:10:23'
  ),
  createData(
    'REF-G0008',
    'test@gmail.com',
    'Création',
    'Lorem ipsum dolor sit amuet, consectetur adipiscing elt.',
    '10/10/2023 - 10:10:23'
  ),
  createData(
    'REF-G0009',
    'test@gmail.com',
    'Création',
    'Lorem ipsum dolor sit amuet, consectetur adipiscing elt.',
    '10/10/2023 - 10:10:23'
  ),
  createData(
    'REF-G00010',
    'test@gmail.com',
    'Création',
    'Lorem ipsum dolor sit amuet, consectetur adipiscing elt.',
    '10/10/2023 - 10:10:23'
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
  id: keyof HistoricalDTO;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'user',
    numeric: false,
    disablePadding: true,
    label: 'Email utilisateur',
  },
  {
    id: 'action',
    numeric: false,
    disablePadding: true,
    label: "Type d'action",
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: true,
    label: 'Description',
  },
  {
    id: 'date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof HistoricalDTO
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof HistoricalDTO) => (event: React.MouseEvent<unknown>) => {
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
      </TableRow>
    </TableHead>
  );
}
export const labelRowsPerPage = 'Ligne(s) par page';

export default function HistoricalTable() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof HistoricalDTO>('action');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { historicaList, loading, reloadHistorical } = useAppSelector(
    (state) => state.historical
  );
  const fetchHistoricalList = useFetchHistoricalList();
  const [key, setKey] = useState<any>('');
  const router = useRouter();
  const [startDate, setStartDate] = useState<any>('');
  const [endDate, setEndDate] = useState<any>('');

  useEffect(() => {
    fetchHistoricalList();
  }, [router.query, reloadHistorical]);

  // Recherche Historique -----------------------------------------

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

  //

  // const handleChangeStartDate = (event: SelectChangeEvent) => {
  //   const query = { ...router.query, startDate: event.target.value as string };
  //   router.push({
  //     pathname: router.pathname,
  //     query: query,
  //   });
  // };

  // React.useEffect(() => {
  //   if (router?.query?.startDate) {
  //     setStartDate(router.query.startDate);
  //   }
  // }, [router.query.startDate]);

  // const handleChangeEndDate = (event: SelectChangeEvent) => {
  //   const query = { ...router.query, endDate: event.target.value as string };
  //   router.push({
  //     pathname: router.pathname,
  //     query: query,
  //   });
  // };

  // React.useEffect(() => {
  //   if (router?.query?.endDate) {
  //     setEndDate(router.query.endDate);
  //   }
  // }, [router.query.endDate]);

  // extret text Description------------------------------------------

  const getExcerpt = (name: string, maxLength: number) => {
    if (name.length <= maxLength) {
      return name;
    }
    return name.substring(0, maxLength) + '...';
  };

  //

  // Format Date -------------------------------------------------

  const formatDate = (date: Date) => {
    if (!date) {
      return 'Date non disponible';
    }

    const formattedDate = new Date(date);
    const day = formattedDate.getDate().toString().padStart(2, '0');
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
    const year = formattedDate.getFullYear();
    const hours = formattedDate.getHours().toString().padStart(2, '0');
    const minutes = formattedDate.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} à ${hours}h${minutes}min`;
  };

  //

  // trad text Action ------------------------------------------------

  const getTextAction = (action: string | undefined) => {
    switch (action) {
      case 'READ':
        return 'Lire';
      case 'CREATE':
        return 'Creer';
      case 'UPDATE':
        return 'Mise_a_jour';
      case 'DELETE':
        return 'Supprimer';
      default:
        break;
    }
  };

  //

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof HistoricalDTO
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - historicaList.length) : 0;

  let visibleRows = React.useMemo(
    () =>
      stableSort<HistoricalDTO | any>(
        historicaList,
        getComparator(order, orderBy)
      ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [historicaList, order, orderBy, page, rowsPerPage]
  );

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar>
            <div className="w-full flex gap-2.5">
              <DatePicker
                label="Date début"
                format="DD/MM/YYYY"
                slotProps={{ textField: { size: 'small' } }}
                // value={startDate}
                // onChange={handleChangeStartDate}
              />
              <DatePicker
                label="Date fin"
                format="DD/MM/YYYY"
                slotProps={{ textField: { size: 'small' } }}
                // value={endDate}
                // onChange={handleChangeEndDate}
              />
              {/* <DatePicker
                label="Date début"
                format="DD/MM/YYYY"
                value={startDate}
                onChange={(date) => {
                  const formattedDate = date;
                  setStartDate(formattedDate);
                  const query = { ...router.query, startDate: formattedDate };
                  router.push({
                    pathname: router.pathname,
                    query: query,
                  });
                }}
                slotProps={{ textField: { size: 'small' } }}
              />
              <DatePicker
                label="Date fin"
                format="DD/MM/YYYY"
                value={endDate}
                onChange={(date) => {
                  const formattedDate = date;
                  setEndDate(formattedDate);
                  const query = { ...router.query, endDate: formattedDate };
                  router.push({
                    pathname: router.pathname,
                    query: query,
                  });
                }}
                slotProps={{ textField: { size: 'small' } }}
              /> */}
            </div>

            <div className="lg:w-1/4 md:w-1/4 sm:w-full flex justify-end">
              <TextField
                variant="outlined"
                size="small"
                placeholder="Recherche"
                fullWidth
                value={key}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search className="text-gray-400" />
                    </InputAdornment>
                  ),
                }}
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
                rowCount={historicaList.length}
              />
              <TableBody>
                {visibleRows.map((row: HistoricalDTO | any, index) => {
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
                        {row.user?.email}
                      </TableCell>
                      <TableCell
                        component="th"
                        align="center"
                        id={labelId}
                        scope="row"
                      >
                        <Badge badgeContent={getTextAction(row?.action)} />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row">
                        {getExcerpt(row.description, 60)}
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row">
                        {row?.date
                          ? formatDate(row.date)
                          : 'Date non disponible'}
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
            count={historicaList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            labelRowsPerPage={labelRowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </>
  );
}
