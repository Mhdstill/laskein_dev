import React from 'react';

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

import Delete from '@mui/icons-material/Delete';
import TableLoading from 'components/shared/loading/TableLoading';
import BoxDTO from 'data/dto/Box.dto';
import BoxRewardLevelDTO from 'data/dto/BoxRewardLevel.dto';
import BoxTypeDTO from 'data/dto/BoxType.dto';
import DailyRewardDTO from 'data/dto/DailyReward';
import { useConfirm } from 'material-ui-confirm';
import { useAppDispatch } from 'services/redux/hooks';
import { enqueueSnackbar } from 'services/redux/notification/notificationSlice';
import { deleteBoxRewardLevel } from 'services/redux/reward/boxRewardLevel/useCase/delete';
import useFetchBoxRewardLevelList from './useFetchBoxRewardLevel';

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
    id: 'reference',
    numeric: false,
    disablePadding: true,
    label: 'Référence',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Nom',
  },
  {
    id: 'boxType',
    numeric: false,
    disablePadding: false,
    label: 'Type',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  // eslint-disable-next-line no-unused-vars
  onRequestSort: (
    // eslint-disable-next-line no-unused-vars
    event: React.MouseEvent<unknown>,
    // eslint-disable-next-line no-unused-vars
    property: keyof BoxDTO | BoxRewardLevelDTO
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof BoxDTO | BoxRewardLevelDTO) =>
    (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id as any)}
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

interface BoxParamsTableProps {
  boxRewardLevelList: BoxRewardLevelDTO[];
  title: string;
  loading: boolean;
}

export default function BoxRewardLevelTable({
  boxRewardLevelList,
  title,
  loading,
}: BoxParamsTableProps) {
  const confirm = useConfirm();
  const dispatch = useAppDispatch();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<
    keyof BoxDTO | BoxRewardLevelDTO
  >('reference');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [selected, setSelected] = React.useState<readonly string[]>([]);

  const handleRequestSort = (
    event: any,
    property: keyof BoxDTO | BoxRewardLevelDTO
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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
      stableSort<any>(
        boxRewardLevelList,
        getComparator(order, orderBy as any)
      ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [boxRewardLevelList, order, orderBy, page, rowsPerPage]
  );

  const fetchBoxRewardLevelList = useFetchBoxRewardLevelList();

  const handleClickDelete = async (id: string) => {
    confirm({
      title: 'Supprimer',
      description:
        'Voulez-vous supprimer ce box dans liste de pallier de récompense?',
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
        const res = await dispatch(
          deleteBoxRewardLevel({
            id: id,
          })
        );
        if (res) {
          dispatch(
            enqueueSnackbar({
              message: `Box supprimé dans la liste des récompenses journalières`,
              options: {
                variant: 'success',
              },
            })
          );
        }
        fetchBoxRewardLevelList();
      })
      .catch(() => {
        dispatch(
          enqueueSnackbar({
            message: `Erreur: Box non supprimé dans la liste des récompenses journalières`,
            options: {
              variant: 'error',
            },
          })
        );
      });
  };

  React.useEffect(() => {
    fetchBoxRewardLevelList();
  }, [dispatch]);

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
                orderBy={orderBy as any}
                onRequestSort={handleRequestSort}
                rowCount={boxRewardLevelList.length}
              />
              <TableBody>
                {visibleRows.map((row: BoxRewardLevelDTO, index) => {
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
                        {row?.box?.reference}
                      </TableCell>
                      <TableCell>{row?.box?.name}</TableCell>
                      <TableCell>{row?.box?.boxType?.name}</TableCell>
                      <TableCell>
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
            count={boxRewardLevelList.length}
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
