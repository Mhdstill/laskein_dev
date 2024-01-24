import React from 'react';

import Visibility from '@mui/icons-material/Visibility';

import Delete from '@mui/icons-material/Delete';
import Search from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
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
import Typography from '@mui/material/Typography';
import { visuallyHidden } from '@mui/utils';

import TableLoading from 'components/shared/loading/TableLoading';
import BoxDTO from 'data/dto/Box.dto';
import BoxTypeDTO from 'data/dto/BoxType.dto';
import DailyRewardDTO from 'data/dto/DailyReward';
import { useAppSelector } from 'services/redux/hooks';

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
  // eslint-disable-next-line no-unused-vars
  a: { [key in Key]: number | string },
  // eslint-disable-next-line no-unused-vars
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
// eslint-disable-next-line no-unused-vars
function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
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
  id: keyof DailyRewardDTO | keyof BoxDTO | keyof BoxTypeDTO;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'number',
    numeric: true,
    disablePadding: true,
    label: 'Jour',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Nom',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  // eslint-disable-next-line no-unused-vars
  onRequestSort: (
    // eslint-disable-next-line no-unused-vars
    event: React.MouseEvent<unknown>,
    // eslint-disable-next-line no-unused-vars
    property: keyof DailyRewardDTO
  ) => void;
  // eslint-disable-next-line no-unused-vars
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof DailyRewardDTO) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id as string}
            align={'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id as keyof DailyRewardDTO)}
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
        <TableCell padding="normal">Type</TableCell>
        <TableCell padding="normal">Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}

interface BoxParamsTableProps {
  dailyRewardList: DailyRewardDTO[];
  missingValues?: number[];
  // eslint-disable-next-line no-unused-vars
  setMissingValues?: (items: number[]) => void;
  // eslint-disable-next-line no-unused-vars
  handleClickDelete: (id: string) => void;
  title: string;
}

export default function DailyRewardBoxTable({
  dailyRewardList,
  missingValues,
  setMissingValues,
  handleClickDelete,
  title,
}: BoxParamsTableProps) {
  const { loading } = useAppSelector((state) => state.dailyReward);
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof DailyRewardDTO>('number');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [selected, setSelected] = React.useState<readonly string[]>([]);

  const handleRequestSort = (event: any, property: keyof DailyRewardDTO) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event: React.MouseEvent<unknown>, reference: string) => {
    const selectedIndex = selected.indexOf(reference);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, reference);
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

  let visibleRows = React.useMemo(
    () =>
      stableSort<DailyRewardDTO | any>(
        dailyRewardList,
        getComparator(order, orderBy)
      ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [dailyRewardList, order, orderBy, page, rowsPerPage]
  );

  React.useEffect(() => {
    if (dailyRewardList && dailyRewardList.length < 29) {
      const existingValues = new Set<number>();

      dailyRewardList.forEach((obj) => {
        existingValues.add(obj.number);
      });

      // Vérifiez si toutes les valeurs de 1 à 28 existent dans l'ensemble.
      let _missingValues: number[] = [];
      for (let i = 1; i < 29; i++) {
        if (!existingValues.has(i)) {
          _missingValues.push(i);
        }
      }
      setMissingValues && setMissingValues(_missingValues);
    }
  }, [dailyRewardList]);

  return (
    <div className="bg-white w-1/2">
      <div className="flex flex-col gap-2 p-2.5">
        <div className="flex w-full justify-between items-start">
          <Typography variant="body1" color="primary" className="w-full">
            {title}
          </Typography>
        </div>

        <div className="w-full flex gap-2.5 justify-end">
          <TextField
            name="searchfield"
            variant="outlined"
            size="small"
            label="Rechercher"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search className="text-gray-400" />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div>
          {!loading && missingValues && missingValues?.length > 0 ? (
            <p>
              Le(s) jour(s) absent(s) dans la liste :
              {missingValues?.map((missingDay) => (
                <i key={missingDay} className="font-bold">
                  {missingDay}{' '}
                </i>
              ))}{' '}
            </p>
          ) : (
            <p>Récompense journalière complète de 28 jours</p>
          )}
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-300 mt-2"></div>

      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            {loading && <TableLoading />}
            <Table aria-labelledby="tableTitle">
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy as string}
                onRequestSort={handleRequestSort}
                rowCount={dailyRewardList.length}
              />

              <TableBody>
                {visibleRows.map((row: DailyRewardDTO, index) => {
                  const isItemSelected = isSelected(row?.id as string);
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
                      <TableCell padding="checkbox">
                        {/* <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        /> */}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row?.number}
                      </TableCell>
                      <TableCell>{row?.box?.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center rounded-full w-auto text-sm">
                          {row?.box?.boxType?.name}
                        </div>
                      </TableCell>
                      <TableCell width={100}>
                        <IconButton size="small">
                          <Visibility />
                        </IconButton>
                        <IconButton
                          onClick={() => handleClickDelete(row?.id!)}
                          size="small"
                          color="error"
                          className="text-red-500"
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={dailyRewardList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </div>
  );
}
