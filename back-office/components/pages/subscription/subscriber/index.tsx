import Article from '@mui/icons-material/Article';
import Message from '@mui/icons-material/Message';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
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
import classNames from 'classnames';
import TableLoading from 'components/shared/loading/TableLoading';
import EnhancedTableToolbar from 'components/shared/table/Toolbar';
import SubscriptionDTO from 'data/dto/subscription.dto';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useAppSelector } from 'services/redux/hooks';
import useFetchOfferListe from '../offer/hooks/useFetchOfferList';
import useFetchSubscriptionList from './hooks/useFetchSubscriptionList';

interface Data {
  email: string;
  balance: number;
  subscription: string;
  startDate: string;
  endDate: string;
  isDirectDebit: boolean;
}

function createData(
  email: string,
  balance: number,
  subscription: string,
  startDate: string,
  endDate: string,
  isDirectDebit: boolean
): Data {
  return {
    email,
    balance,
    subscription,
    startDate,
    endDate,
    isDirectDebit,
  };
}

const rows: Data[] = [
  createData('test@gmail.com', 305, 'basic', '10/10/2022', '10/11/2022', false),
  createData(
    'test2@gmail.com',
    305.99,
    'junior',
    '10/10/2022',
    '10/11/2022',
    true
  ),
  createData(
    'test3@gmail.com',
    305.1,
    'expert',
    '10/10/2022',
    '10/11/2022',
    true
  ),
  createData('test4@gmail.com', 305, 'vip', '10/10/2022', '10/11/2022', false),
  createData('test5@gmail.com', 305, 'basic', '10/10/2022', '10/11/2022', true),
  createData(
    'test6@gmail.com',
    305,
    'junior',
    '10/10/2022',
    '10/11/2022',
    true
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
  id: keyof SubscriptionDTO | any;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'user',
    numeric: false,
    disablePadding: true,
    label: 'Email',
  },
  {
    id: 'email',
    numeric: true,
    disablePadding: false,
    label: 'Solde',
  },
  {
    id: 'offer',
    numeric: false,
    disablePadding: false,
    label: "Type d'bonnement",
  },
  {
    id: 'startDate',
    numeric: false,
    disablePadding: false,
    label: 'Date de début',
  },
  {
    id: 'endDate',
    numeric: false,
    disablePadding: false,
    label: 'Date de fin',
  },
  {
    id: 'isDirectDebit',
    numeric: false,
    disablePadding: false,
    label: 'Prélèvement auto',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof SubscriptionDTO
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof SubscriptionDTO) => (event: React.MouseEvent<unknown>) => {
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

export default function Subscriber() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof SubscriptionDTO>('user');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { subscriptionList, loading, reloadSubscription } = useAppSelector(
    (state) => state.subscription
  );
  const router = useRouter();
  const [key, setKey] = React.useState<any>('');
  const [offer, setOffer] = React.useState<any>('');
  const { offerList } = useAppSelector((state) => state.offer);

  const fetchSubsriptionList = useFetchSubscriptionList();
  const fetchOfferList = useFetchOfferListe();

  React.useEffect(() => {
    fetchOfferList();
  }, []);

  React.useEffect(() => {
    fetchSubsriptionList();
  }, [router.query, reloadSubscription]);

  // filtre && recherche---------------------------------------

  React.useEffect(() => {
    if (router?.query?.search) {
      setKey(router.query.search);
    }

    if (router?.query?.filter) {
      setOffer(router.query.filter);
    }
  }, [router.query.search, router.query.filter]);

  const search = (key: string) => {
    const query = { ...router.query, search: key };
    router.push({
      pathname: router.pathname,
      query: query,
    });
  };

  const filter = (offer: string) => {
    const query = { ...router.query, filter: offer };
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
    if (event.target.value === '') {
      setKey('');
    }
  };

  //

  // calcul Date---------------------------------------------------

  const calculateEndDate = (startDate: any, duration: any) => {
    const endDateObject = new Date(startDate);

    endDateObject.setMonth(endDateObject.getMonth() + duration);

    return endDateObject;
  };

  //

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof SubscriptionDTO
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
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - subscriptionList.length)
      : 0;

  let visibleRows = React.useMemo(
    () =>
      stableSort<SubscriptionDTO | any>(
        subscriptionList,
        getComparator(order, orderBy)
      ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [subscriptionList, order, orderBy, page, rowsPerPage]
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar>
          <div className="p-2.5 row flex lg:flex-row md:flex-row sm:flex-col w-full justify-between items-center lg:gap-10 md:gap-2 sm:gap-2">
            <Button
              variant="outlined"
              color="primary"
              className="!normal-case h-full w-[150px] text-[#376F70] border border-[#376F70] hover:border-[#376F70]"
              startIcon={<Article />}
            >
              Imprimer
            </Button>

            <FormControl className="lg:w-[250px] md:w-[250px] sm:w-full">
              <InputLabel className="-mt-2" id="demo-simple-select-label">
                Type d&apos;abonnement
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                size="small"
              >
                <MenuItem
                  selected
                  value={'basic'}
                  onClick={() => {
                    setOffer('');
                    filter('');
                  }}
                >
                  Tous
                </MenuItem>
                {offerList.map((currentOffer) => (
                  <MenuItem
                    key={currentOffer.id}
                    value={currentOffer.id}
                    onClick={() => {
                      setOffer(currentOffer?.name!);
                      filter(currentOffer?.name!);
                    }}
                  >
                    {currentOffer.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Recherche"
              variant="outlined"
              size="small"
              className="lg:w-auto md:w-auto sm:w-full"
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
              rowCount={subscriptionList.length}
            />
            <TableBody>
              {visibleRows.map((row: SubscriptionDTO, index) => {
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
                    <TableCell>{row.user?.wallet?.balance} €</TableCell>
                    <TableCell>
                      <div
                        className={classNames(
                          'text-[12px] leading-5 w-full border flex p-1 rounded-full justify-center',
                          row.offer?.name === 'basic'
                            ? 'border-[#D2339B] text-[#D2339B]'
                            : row.offer?.name === 'junior'
                            ? 'border-[#33B063] text-[#33B063]'
                            : row.offer?.name === 'expert'
                            ? 'border-[#7F33AF] text-[#7F33AF]'
                            : 'border-[#FBA048] text-[#FBA048]'
                        )}
                      >
                        {row.offer?.name === 'basic'
                          ? 'Basique'
                          : row.offer?.name === 'junior'
                          ? 'Débutant'
                          : row.offer?.name === 'expert'
                          ? 'Expert'
                          : 'V.I.P'}
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(row?.startDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {calculateEndDate(
                        row.startDate,
                        row?.offer?.duration
                      ).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div
                        className={classNames(
                          'text-[12px] leading-5 w-full flex p-1 rounded-full justify-center text-white',
                          row.autoRenewal ? 'bg-[#376F70]' : 'bg-[#C62828]'
                        )}
                      >
                        {row.autoRenewal ? 'Activé' : 'Désactivé'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" color="info">
                        <Message />
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
          count={subscriptionList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          labelRowsPerPage={labelRowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export const labelRowsPerPage = 'Ligne(s) par page';
