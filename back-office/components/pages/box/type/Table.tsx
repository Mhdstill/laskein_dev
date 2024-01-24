import React from 'react';

import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

import IconButton from '@mui/material/IconButton';

import TableLoading from 'components/shared/loading/TableLoading';
import { useConfirm } from 'material-ui-confirm';
import { Order } from '../../../../data/constant';
import BoxTypeDTO from '../../../../data/dto/BoxType.dto';
import {
  deleteBoxType,
  editBoxType,
  getBoxTypeList,
} from '../../../../services/redux/box/type';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../services/redux/hooks';
import EnhancedTableHead, {
  HeadCell,
  getComparator,
  stableSort,
} from '../../../shared/table/Head';
import Pagination from '../../../shared/table/Pagination';
import EnhancedTableToolbar from '../../../shared/table/Toolbar';

const headCells: HeadCell[] = [
  {
    id: 'reference',
    numeric: false,
    disablePadding: true,
    label: 'Référence',
  },
  {
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: 'Nom',
  },
];

export default function BoxTypeTable() {
  const dispatch = useAppDispatch();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof BoxTypeDTO>('reference');
  // eslint-disable-next-line no-unused-vars
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(5);
  const { boxTypeList, loading, reloadBoxType } = useAppSelector(
    (state) => state.boxType
  );
  const confirm = useConfirm();

  React.useEffect(() => {
    dispatch(getBoxTypeList({}));
  }, [dispatch, reloadBoxType]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof BoxTypeDTO
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - boxTypeList.length) : 0;

  let visibleRows = React.useMemo(
    () =>
      stableSort<BoxTypeDTO | any>(
        boxTypeList,
        getComparator(order, orderBy)
      ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [boxTypeList, order, orderBy, page, rowsPerPage]
  );

  const handleclickDelete = async (id: any) => {
    confirm({
      title: 'Supprimer',
      description: 'Voulez-vous vraiment supprimer ce type de box ?',
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
        await dispatch(deleteBoxType({ id }));
        dispatch(getBoxTypeList({}));
      })
      .catch(() => {});
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar>
          {/* <div className="flex justify-end w-full">
            <TextField
              placeholder="Rechercher"
              size="small"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
          </div> */}
        </EnhancedTableToolbar>
        <TableContainer>
          {loading && <TableLoading />}
          <Table aria-labelledby="tableTitle" size={'small'}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={boxTypeList.length}
              headCells={headCells}
            />
            <TableBody>
              {visibleRows.map((row: BoxTypeDTO, index) => {
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
                      {row.reference}
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell width={100}>
                      <div className="flex gap-1 w-20">
                        <IconButton
                          size="small"
                          color="secondary"
                          onClick={async () => {
                            await dispatch(editBoxType({ id: row.id }));
                          }}
                        >
                          <Edit />
                        </IconButton>
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

        <Pagination list={boxTypeList} page={page} setPage={setPage} />
      </Paper>
    </Box>
  );
}
