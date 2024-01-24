import { TableHead, TablePagination, TableSortLabel } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { visuallyHidden } from '@mui/utils';
import classNames from 'classnames';
import TableLoading from 'components/shared/loading/TableLoading';
import { getComparator, stableSort } from 'components/shared/table/Head';
import { Order } from 'data/constant';
import GameDTO from 'data/dto/Game.dto';
import { GameStatusEnum } from 'data/enum/GameStatus.enum';
import { debounce } from 'lodash';
import moment from 'moment';
import { useRouter } from 'next/router';
import React from 'react';
import { useAppSelector } from 'services/redux/hooks';
import useFetchGameList from './hooks/useFetchGameList';

interface HeadCell {
  disablePadding: boolean;
  id: keyof GameDTO;
  label: string;
  numeric: boolean;
}
const headCells: readonly HeadCell[] = [
  {
    id: 'reference',
    numeric: false,
    disablePadding: true,
    label: 'Référence',
  },
  {
    id: `userBox`, //userBox.user.box
    numeric: false,
    disablePadding: true,
    label: 'Email utilisateur',
  },
  {
    id: 'startDate',
    numeric: false,
    disablePadding: true,
    label: 'Date de début',
  },
  {
    id: 'endDate',
    numeric: false,
    disablePadding: true,
    label: 'Date de fin',
  },
  {
    id: 'userBox', // userbox.box.referenceBox
    numeric: false,
    disablePadding: true,
    label: 'Box',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: true,
    label: 'Statut',
  },
];

function EnhancedTableToolbar() {
  return (
    <div className="p-2.5 row flex lg:flex-row md:flex-row sm:flex-col w-full justify-between items-center lg:gap-10 md:gap-2 sm:gap-2">
      <div className="w-1/4"></div>

      <div className="lg:w-1/2 md:w-1/2 sm:w-full flex lg:flex-row md:flex-row sm:flex-col gap-2.5">
        {/* <DatePicker
          label="Date début"
          format="DD/MM/YYYY"
          slotProps={{ textField: { size: 'small' } }}
        />
        <DatePicker
          label="Date fin"
          format="DD/MM/YYYY"
          slotProps={{ textField: { size: 'small' } }}
        /> */}
      </div>

      <div className="lg:w-1/4 md:w-1/4 sm:w-full flex justify-end">
        <TextField
          label="Recherche"
          variant="outlined"
          size="small"
          fullWidth
        />
      </div>
    </div>
  );
}

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    // eslint-disable-next-line no-unused-vars
    event: React.MouseEvent<unknown>,
    // eslint-disable-next-line no-unused-vars
    property: keyof GameDTO
  ) => void;
  // eslint-disable-next-line no-unused-vars
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  headCells: readonly HeadCell[];
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof GameDTO) => (event: React.MouseEvent<unknown>) => {
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
        {/* <TableCell padding="normal">Actions</TableCell> */}
      </TableRow>
    </TableHead>
  );
}

export default function ArticleTable() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof GameDTO>('reference');
  // eslint-disable-next-line no-unused-vars
  const [key, setKey] = React.useState<string>('');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const { gameList, loading, reloadGame } = useAppSelector(
    (state) => state.game
  );
  const router = useRouter();
  const fetchGameList = useFetchGameList();

  React.useEffect(() => {
    fetchGameList();
  }, [router.query, reloadGame]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof GameDTO
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - gameList.length) : 0;

  let visibleRows = React.useMemo(
    () =>
      stableSort<GameDTO | any>(gameList, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [gameList, order, orderBy, page, rowsPerPage]
  );

  // eslint-disable-next-line no-unused-vars
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKey(event.target.value);
    deboncedSearch(event.target.value);
  };

  const search = (key: string) => {
    const query = { ...router.query, search: key };
    router.push({
      pathname: router.pathname,
      query: query,
    });
  };

  const deboncedSearch = React.useCallback(debounce(search, 500), [
    router.query,
  ]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
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

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    if (router?.query?.search) {
      setKey(router.query.search as string);
    }
  }, [router.query.search, router.query.filter]);

  return (
    // <>
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar />
        <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
          {loading && <TableLoading />}
          <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={gameList.length}
              // eslint-disable-next-line no-unused-vars
              headCells={headCells}
              onSelectAllClick={function (
                // eslint-disable-next-line no-unused-vars
                event: React.ChangeEvent<HTMLInputElement>
              ): void {
                throw new Error('Function not implemented.');
              }}
            />
            <TableBody>
              {visibleRows.map((row: GameDTO, index) => {
                const isItemSelected = isSelected(row.id as string);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) =>
                      handleClick(event, row.reference as string)
                    }
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.reference}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell component="th" id={labelId} scope="row">
                      {row?.reference?.length > 10
                        ? `${row?.reference.slice(0, 10)}...`
                        : row?.reference}
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row">
                      {row?.userBox?.user?.email ?? 'Non définie'}
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row">
                      {moment(String(row.startDate)).format(
                        'DD/MM/YYYY - HH:mm:ss'
                      )}
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row">
                      {moment(String(row.endDate)).format(
                        'DD/MM/YYYY - HH:mm:ss'
                      )}
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row">
                      {row?.userBox?.box?.name ?? 'Non définie'}
                    </TableCell>
                    <TableCell>
                      <div
                        className={classNames(
                          'text-[12px] leading-5 w-full flex p-1 rounded-full justify-center text-white',
                          row?.status === GameStatusEnum.RUNNING
                            ? 'bg-[#FB8C00]'
                            : row?.status === GameStatusEnum.ERROR
                            ? 'bg-red-500'
                            : 'bg-[#2E7D32]'
                        )}
                      >
                        {row.status === GameStatusEnum.RUNNING
                          ? 'En cours'
                          : row?.status === GameStatusEnum.ERROR
                          ? 'Erreur'
                          : 'Terminé'}
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
          count={gameList.length}
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
