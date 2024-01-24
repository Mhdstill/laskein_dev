import React from 'react';

import Delete from '@mui/icons-material/Delete';

import { TablePagination } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableLoading from 'components/shared/loading/TableLoading';
import NewsLetterDTO from 'data/dto/NewsLetter.dto';
import { useConfirm } from 'material-ui-confirm';
import { deleteNewsLetter } from 'services/redux/newsLetter';
import { Order } from '../../../../data/constant';
import UnitySizeDTO from '../../../../data/dto/UnitySize.dto';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../services/redux/hooks';
import EnhancedTableHead, {
  HeadCell,
  getComparator,
  stableSort,
} from '../../../shared/table/Head';
import useFetchNewLetterListe from './hooks/useFetchNewsLetter';

const headCells: HeadCell[] = [
  {
    id: 'email',
    numeric: false,
    disablePadding: true,
    label: 'Email',
  },
];

export default function NewLetterTable() {
  const dispatch = useAppDispatch();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof NewsLetterDTO>('email');
  // eslint-disable-next-line no-unused-vars
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { newsLetterList, loading, reloadNewsLetter } = useAppSelector(
    (state) => state.newsLetter
  );
  const confirm = useConfirm();

  const fetchNewLetterList = useFetchNewLetterListe();
  React.useEffect(() => {
    fetchNewLetterList();
  }, [reloadNewsLetter]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof NewsLetterDTO
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
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
      ? Math.max(0, (1 + page) * rowsPerPage - newsLetterList.length)
      : 0;

  let visibleRows = React.useMemo(
    () =>
      stableSort<UnitySizeDTO | any>(
        newsLetterList,
        getComparator(order, orderBy)
      ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [newsLetterList, order, orderBy, page, rowsPerPage]
  );

  const handleclickDelete = async (id: any) => {
    confirm({
      title: 'Supprimer ce lettre',
      description: 'Voulez-vous vraiment supprimer ce lettre ?',
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
        await dispatch(deleteNewsLetter({ id }));
        fetchNewLetterList();
      })
      .catch(() => {});
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        {/* <EnhancedTableToolbar>
        </EnhancedTableToolbar> */}
        <TableContainer>
          {loading && <TableLoading />}
          <Table aria-labelledby="tableTitle" size={'small'}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={newsLetterList.length}
              headCells={headCells}
            />
            <TableBody>
              {visibleRows.map((row: NewsLetterDTO, index) => {
                const isItemSelected = isSelected(row.id as string);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell component="th" id={labelId} scope="row">
                      {row?.email}
                    </TableCell>
                    <TableCell width={100}>
                      <div className="flex gap-1 w-20">
                        <IconButton
                          size="small"
                          color="error"
                          className="text-red-500"
                          onClick={() => handleclickDelete(row.id)}
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
          count={newsLetterList.length}
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
