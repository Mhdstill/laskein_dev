import { Visibility } from '@mui/icons-material';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import Tune from '@mui/icons-material/Tune';
import { TablePagination } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableLoading from 'components/shared/loading/TableLoading';
import RewardLevelDTO from 'data/dto/RewardLevel.dto';
import { useConfirm } from 'material-ui-confirm';
import React from 'react';

import { useRouter } from 'next/router';
import {
  deleteRewardLevel,
  editRewardLevel,
  getRewardLevel,
} from 'services/redux/reward/level';
import {
  cancelEditRewardLevel,
  setActiveUi,
} from 'services/redux/reward/level/rewardLevelSlice';
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
import useFetchRewardLevelList from './hooks/useFetchRewardLevelList';

const headCells: HeadCell[] = [
  {
    id: 'orderNumber',
    numeric: false,
    disablePadding: true,
    label: 'Numéro',
  },
  {
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: 'Nom',
  },
  {
    id: 'unlockThreshold',
    numeric: true,
    disablePadding: false,
    label: 'Seuil de déblocage',
  },
  {
    id: 'description',
    numeric: true,
    disablePadding: false,
    label: 'Description',
  },
];

export default function RewardLevelTable() {
  const dispatch = useAppDispatch();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] =
    React.useState<keyof RewardLevelDTO>('orderNumber');
  // eslint-disable-next-line no-unused-vars
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { rewardLevelList, loading, reloadRewardLevel } = useAppSelector(
    (state) => state.rewardLevel
  );

  const router = useRouter();
  const confirm = useConfirm();

  const fetchRewardLevel = useFetchRewardLevelList();
  React.useEffect(() => {
    fetchRewardLevel();
  }, [reloadRewardLevel]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof RewardLevelDTO
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
      ? Math.max(0, (1 + page) * rowsPerPage - rewardLevelList.length)
      : 0;

  let visibleRows = React.useMemo(
    () =>
      stableSort<UnitySizeDTO | any>(
        rewardLevelList,
        getComparator(order, orderBy)
      ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [rewardLevelList, order, orderBy, page, rowsPerPage]
  );

  const handleclickDelete = async (id: any) => {
    confirm({
      title: 'Supprimer ce pallier de récompense',
      description: 'Confirmer la suppression',
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
        await dispatch(deleteRewardLevel({ id }));
        fetchRewardLevel();
      })
      .catch(() => {});
  };

  const handleClickDetails = (rewardId: string) => {
    dispatch(setActiveUi('details'));
    dispatch(cancelEditRewardLevel());
    dispatch(getRewardLevel({ id: rewardId }));
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
              rowCount={rewardLevelList.length}
              headCells={headCells}
            />
            <TableBody>
              {visibleRows.map((row: RewardLevelDTO | any, index) => {
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
                      {row.orderNumber}
                    </TableCell>
                    <TableCell>{row?.name}</TableCell>
                    <TableCell>{row?.unlockThreshold}</TableCell>
                    <TableCell>{row?.description}</TableCell>
                    <TableCell width={100}>
                      <div className="flex gap-1 ">
                        <Button
                          variant="outlined"
                          size="small"
                          color="warning"
                          startIcon={<Tune />}
                          className="mr-1"
                          onClick={() => {
                            router.push(`/reward?rewardLevelId=${row?.id}`);
                            dispatch(getRewardLevel({ id: row?.id }));
                            dispatch(setActiveUi('box'));
                          }}
                        >
                          Box
                        </Button>
                        <IconButton
                          size="small"
                          onClick={() => {
                            handleClickDetails(row.id as string);
                          }}
                        >
                          <Visibility />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="secondary"
                          onClick={async () => {
                            await dispatch(
                              editRewardLevel({
                                id: row.id,
                              })
                            );
                            dispatch(setActiveUi('form'));
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rewardLevelList.length}
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
