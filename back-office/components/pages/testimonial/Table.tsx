import React, { useEffect } from 'react';

import Delete from '@mui/icons-material/Delete';
import Star from '@mui/icons-material/Star';
import { Checkbox } from '@mui/material';
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
import TableLoading from 'components/shared/loading/TableLoading';
import TestimonialDTO from 'data/dto/Tesimonial.dto';
import { useConfirm } from 'material-ui-confirm';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { deleteTemoignage, updateTemoignage } from 'services/redux/temoignage';
import useFetchTemoignageListe from './hooks/useFetchTemoignage';

interface Data {
  ref: string;
  isPublic: boolean;
  name: string;
  date: string;
  content: string;
  rate: number;
}

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
    id: 'isPublic',
    numeric: false,
    disablePadding: true,
    label: 'Suivi',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Nom',
  },
  {
    id: 'date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
  },
  {
    id: 'content',
    numeric: false,
    disablePadding: true,
    label: 'Contenu',
  },
  {
    id: 'rate',
    numeric: false,
    disablePadding: true,
    label: 'Note',
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

export default function TestimonialTable() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('name');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);
  const { temoignageList, loading, reloadTemoignage } = useAppSelector(
    (state) => state.temoignage
  );
  const fetchTemoignageList = useFetchTemoignageListe();
  const confirm = useConfirm();
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchTemoignageList();
  }, [reloadTemoignage]);

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
      const newSelected = temoignageList.map((n) => n.id);
      setSelected(newSelected as any);
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
      ? Math.max(0, (1 + page) * rowsPerPage - temoignageList.length)
      : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort<TestimonialDTO | any>(
        temoignageList,
        getComparator(order, orderBy)
      ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [temoignageList, order, orderBy, page, rowsPerPage]
  );

  const handleclickDelete = async (id: any) => {
    confirm({
      title: 'Supprimer le Model',
      description: 'Voulez-vous vraiment supprimer ce témoignage?',
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
        await dispatch(deleteTemoignage({ id }));
        fetchTemoignageList();
      })
      .catch(() => {});
  };

  const getExcerpt = (name: string, maxLength: number) => {
    if (name.length <= maxLength) {
      return name;
    }
    return name.substring(0, maxLength) + '...';
  };

  const handlerCheckbox = async (id: any, currentIsToShow: boolean) => {
    const temoignage: any = {
      isToShow: !currentIsToShow,
    };
    await dispatch(updateTemoignage({ id, temoignage }));
    fetchTemoignageList();
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          {loading && <TableLoading />}
          <Table aria-labelledby="tableTitle" size={'small'}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={temoignageList.length}
            />
            <TableBody>
              {visibleRows.map((row: TestimonialDTO | any, index: any) => {
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
                      <Checkbox
                        color="primary"
                        checked={row.isToShow}
                        onClick={() => {
                          handlerCheckbox(row.id, row.isToShow);
                        }}
                        inputProps={
                          {
                            // 'aria-labelledby': labelId,
                          }
                        }
                      />
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row">
                      {row.user?.firstName} {row.user?.username}
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row">
                      {new Date(row?.commentDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row">
                      {/* {row.comment} */}
                      {getExcerpt(row?.comment, 55)}
                    </TableCell>

                    <TableCell component="th" id={labelId} scope="row">
                      <div className="flex gap-1">
                        {Array.from('stars').map((char, index) => {
                          if (index < row?.rating)
                            return <Star key={char} color="warning" />;
                          return <Star key={char} className="text-gray-300" />;
                        })}
                      </div>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleclickDelete(row.id)}
                      >
                        <Delete />
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
          count={temoignageList.length}
          rowsPerPage={rowsPerPage}
          labelRowsPerPage={labelRowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export const labelRowsPerPage = 'Ligne(s) par page';
