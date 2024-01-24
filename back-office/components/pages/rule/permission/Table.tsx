import React from 'react';

import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';

import { Tune } from '@mui/icons-material';
import { Badge, Box, Button } from '@mui/material';
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
import PermissionDTO from 'data/dto/Permission.dto';
import { useConfirm } from 'material-ui-confirm';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { deletePermission, editPermission } from 'services/redux/permission';
import { toggleModelInsideRule } from 'services/redux/rule/ruleSlice';
import useFetchPermissionListe from './hooks/useFetchPermissionList';

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
    label: 'Permission',
  },
];

const getTextAction = (action: string | undefined) => {
  switch (action) {
    case 'READ':
      return 'Lire';
    case 'CREATE':
      return 'Créer';
    case 'UPDATE':
      return 'mettre_a_jour';
    case 'DELETE':
      return 'Supprimer';
    default:
      break;
  }
};

export default function ModelTable() {
  const dispatch = useAppDispatch();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof PermissionDTO>('keyword');
  // eslint-disable-next-line no-unused-vars
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(5);
  const { permissionList, loading, reloadPermission } = useAppSelector(
    (state) => state.permission
  );
  const confirm = useConfirm();

  const fetchPermissionList = useFetchPermissionListe();
  React.useEffect(() => {
    fetchPermissionList();
  }, [reloadPermission]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof PermissionDTO
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - permissionList.length)
      : 0;

  let visibleRows = React.useMemo(
    () =>
      stableSort<PermissionDTO | any>(
        permissionList,
        getComparator(order, orderBy)
      ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [permissionList, order, orderBy, page, rowsPerPage]
  );

  const handleclickDelete = async (id: any) => {
    confirm({
      title: 'Supprimer le Permission',
      description: 'Voulez-vous vraiment supprimer ce Permission ?',
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
        await dispatch(deletePermission({ id }));
        fetchPermissionList();
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
              rowCount={permissionList.length}
              headCells={headCells}
            />
            <TableBody>
              {visibleRows.map((row: PermissionDTO, index) => {
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
                    <TableCell>
                      {/* {row.name} */}
                      <Badge
                        sx={{ pl: 5 }}
                        badgeContent={getTextAction(row.name)}
                      />
                    </TableCell>
                    <TableCell width={220}>
                      <Button
                        variant="outlined"
                        size="small"
                        color="warning"
                        startIcon={<Tune />}
                        className="mr-1"
                        onClick={() => dispatch(toggleModelInsideRule(true))}
                      >
                        Model
                      </Button>
                      <IconButton
                        size="small"
                        color="secondary"
                        onClick={async () => {
                          await dispatch(editPermission({ id: row.id }));
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

        <Pagination list={permissionList} page={page} setPage={setPage} />
      </Paper>
    </Box>
  );
}
