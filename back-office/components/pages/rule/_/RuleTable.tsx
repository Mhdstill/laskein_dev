import React from 'react';

import Edit from '@mui/icons-material/Edit';

import { Tune } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableLoading from 'components/shared/loading/TableLoading';
import EnhancedTableHead, {
  HeadCell,
  getComparator,
  stableSort,
} from 'components/shared/table/Head';
import Pagination from 'components/shared/table/Pagination';
import { Order } from 'data/constant';
import RuleDTO from 'data/dto/Rule.dto';
import { editRole } from 'services/redux/role';
import { togglePermissionInsideRule } from 'services/redux/rule/ruleSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../services/redux/hooks';
import useFetchRoleListe from './hooks/useFetchRoleList';

const headCells: HeadCell[] = [
  {
    id: 'keyword',
    numeric: false,
    disablePadding: true,
    label: 'Référence',
  },
  {
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: 'Rôle',
  },
];

export default function ModelTable() {
  const dispatch = useAppDispatch();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof RuleDTO>('keyword');
  // eslint-disable-next-line no-unused-vars
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(5);
  const { roleList, loading, reloadRole } = useAppSelector(
    (state) => state.role
  );
  // const confirm = useConfirm();

  const fetchRoleList = useFetchRoleListe();
  React.useEffect(() => {
    fetchRoleList();
  }, [reloadRole]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof RuleDTO
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - roleList.length) : 0;

  let visibleRows = React.useMemo(
    () =>
      stableSort<RuleDTO | any>(roleList, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [roleList, order, orderBy, page, rowsPerPage]
  );

  // const handleclickDelete = async (id: any) => {
  //   confirm({
  //     title: 'Supprimer le Role',
  //     description: 'Voulez-vous vraiment supprimer ce Role ?',
  //     cancellationText: 'Annuler',
  //     confirmationText: 'Supprimer',
  //     cancellationButtonProps: {
  //       color: 'warning',
  //     },
  //     confirmationButtonProps: {
  //       color: 'error',
  //     },
  //   })
  //     .then(async () => {
  //       await dispatch(deleteRole({ id }));
  //       fetchRoleList();
  //     })
  //     .catch(() => {});
  // };
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
              rowCount={roleList.length}
              headCells={headCells}
            />
            <TableBody>
              {visibleRows.map((row: RuleDTO, index) => {
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
                      {row?.keyword}
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell width={220}>
                      <Button
                        variant="outlined"
                        size="small"
                        color="warning"
                        startIcon={<Tune />}
                        className="mr-1"
                        onClick={() =>
                          dispatch(togglePermissionInsideRule(true))
                        }
                      >
                        Permission
                      </Button>
                      <IconButton
                        size="small"
                        color="secondary"
                        onClick={async () => {
                          await dispatch(editRole({ id: row.id }));
                        }}
                      >
                        <Edit />
                      </IconButton>
                      {/* <IconButton
                        size="small"
                        color="error"
                        className="text-red-500"
                        onClick={() => handleclickDelete(row.id)}
                      >
                        <Delete />
                      </IconButton> */}
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

        <Pagination list={roleList} page={page} setPage={setPage} />
      </Paper>
    </Box>
  );
}
