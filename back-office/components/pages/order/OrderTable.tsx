import Delete from '@mui/icons-material/Delete';
import Mail from '@mui/icons-material/Mail';
import Visibility from '@mui/icons-material/Visibility';

import Article from '@mui/icons-material/Article';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { DatePicker } from '@mui/x-date-pickers';
import classNames from 'classnames';
import TableLoading from 'components/shared/loading/TableLoading';
import EnhancedTableHead, {
  HeadCell,
  getComparator,
  stableSort,
} from 'components/shared/table/Head';
import { Order } from 'data/constant';
import OrderDTO from 'data/dto/Order.dto';
import { useConfirm } from 'material-ui-confirm';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import {
  deleteOrder,
  editOrder,
  getOrder,
  updateOrder,
} from 'services/redux/order';
import { cancelEditOrder, setActiveUi } from 'services/redux/order/orderSlice';
import InDeliveryOrderFormDialog from './InDeliveryOrderFormDialog';
import PendingOrderFormDialog from './PendigOrderFormDialog';
import useFetchOrderListe from './hooks/useFetchOrderListe';

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)

const headCells: HeadCell[] = [
  // {
  //   id: 'orderNumber',
  //   numeric: false,
  //   disablePadding: true,
  //   label: 'Référence',
  // },
  {
    id: 'winningdate',
    numeric: true,
    disablePadding: false,
    label: 'Date',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email utilisateur',
  },
  {
    id: 'article',
    numeric: false,
    disablePadding: false,
    label: 'Référence article',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Statut',
  },
];

function EnhancedTableToolbar() {
  return (
    <div className="p-2.5 row flex lg:flex-row md:flex-row sm:flex-col w-full justify-between items-center lg:gap-10 md:gap-2 sm:gap-2">
      <div className="w-full">
        <Button
          variant="outlined"
          color="primary"
          className="!normal-case h-full text-[#376F70] border border-[#376F70] hover:border-[#376F70]"
          startIcon={<Article />}
        >
          Imprimer
        </Button>
      </div>
      <div className="w-full flex gap-2.5">
        <DatePicker
          label="Date début"
          format="DD/MM/YYYY"
          slotProps={{ textField: { size: 'small' } }}
        />
        <DatePicker
          label="Date fin"
          format="DD/MM/YYYY"
          slotProps={{ textField: { size: 'small' } }}
        />
      </div>
    </div>
  );
}

export default function OrderTable() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof OrderDTO>('orderNumber');
  const [selected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { orderList, loading, reloadOrder } = useAppSelector(
    (state) => state.order
  );
  const confirm = useConfirm();
  const dispatch = useAppDispatch();

  const fetchOrderList = useFetchOrderListe();

  React.useEffect(() => {
    fetchOrderList();
  }, [reloadOrder]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof OrderDTO
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orderList.length) : 0;

  let visibleRows = React.useMemo(
    () =>
      stableSort<OrderDTO | any>(
        orderList,
        getComparator(order, orderBy)
      ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [orderList, order, orderBy, page, rowsPerPage]
  );

  // button delete---------------------------------

  const handleclickDelete = async (id: any) => {
    confirm({
      title: 'Supprimer Commande',
      description: 'Voulez-vous vraiment supprimer ce commande ?',
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
        await dispatch(deleteOrder({ id }));
        fetchOrderList();
      })
      .catch(() => {});
  };

  // button en cours de livraison---------------------------------

  const handleClickOnDelivery = async (id: any) => {
    await dispatch(editOrder({ id }));
    setOpenInDeliveryOrderForm(true);
    dispatch(
      getOrder({
        id: id,
        args: {
          include: {
            shoppingCart: {
              include: {
                user: {
                  include: {
                    address: true,
                  },
                },
                game: {
                  include: {
                    article: true,
                  },
                },
              },
            },
          },
        },
      })
    );
  };

  // button en cours de traitement----------------------------------------

  const handleClickInProgress = async (id: any) => {
    await dispatch(editOrder({ id }));
    setOpenPendingOrderForm(true);
    dispatch(
      getOrder({
        id: id,
        args: {
          include: {
            shoppingCart: {
              include: {
                user: {
                  include: {
                    address: true,
                  },
                },
                game: {
                  include: {
                    article: true,
                  },
                },
              },
            },
          },
        },
      })
    );
  };

  // button details----------------------------------
  const handleClickDetails = (orderId: string) => {
    dispatch(setActiveUi('details'));
    dispatch(cancelEditOrder());
    dispatch(
      getOrder({
        id: orderId,
        args: {
          include: {
            shoppingCart: {
              include: {
                user: {
                  include: {
                    address: true,
                  },
                },
                game: {
                  include: {
                    article: {
                      include: {
                        provider: true,
                        box: true,
                        price: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      })
    );
  };

  //button DELIVERED --------------------------------

  const handleClickLivre = async (id: any) => {
    const order: any = {
      status: 'DELIVERED',
    };
    await dispatch(updateOrder({ id, order }));
    fetchOrderList();
  };

  const [openPendingOrderForm, setOpenPendingOrderForm] =
    React.useState<boolean>(false);
  const [openInDeliveryOrderForm, setOpenInDeliveryOrderForm] =
    React.useState<boolean>(false);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar />
        <TableContainer>
          {loading && <TableLoading />}
          <Table aria-labelledby="tableTitle" size={'small'}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              // onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={orderList.length}
              headCells={headCells}
            />
            <TableBody>
              {visibleRows.map((row: OrderDTO | any) => {
                const isItemSelected = isSelected(row.id as string);
                // const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    // onClick={(event) => handleClick(event, row.id as string)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    {/* <TableCell component="th" id={labelId} scope="row">
                      {row.orderNumber}
                    </TableCell> */}
                    <TableCell>
                      {new Date(
                        row?.shoppingCart?.winningDate
                      ).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{row.shoppingCart?.user?.email}</TableCell>
                    <TableCell>
                      {row.shoppingCart?.game?.article?.reference}
                    </TableCell>
                    <TableCell>
                      <div
                        className={classNames(
                          'text-[12px] leading-5 w-[100px] flex p-1 rounded-full text-white justify-center items-center',
                          row.status === 'PENDING'
                            ? 'bg-[#376F70]'
                            : row.status === 'DELIVERED'
                            ? 'bg-[#2E7D32]'
                            : row.status === 'ONDELIVERY'
                            ? 'bg-[#1976D2]'
                            : 'bg-[#FB8C00]'
                        )}
                      >
                        <p className="text-center">
                          {row.status === 'PENDING'
                            ? 'En Attente'
                            : row.status === 'DELIVERED'
                            ? 'Livré'
                            : row.status === 'ONDELIVERY'
                            ? 'En livraison'
                            : 'En traitement'}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={classNames('flex gap-1 items-center')}>
                        <Button
                          variant="outlined"
                          color={
                            row.status === 'INPROGRESS' ? 'warning' : 'gray'
                          }
                          size="small"
                          onClick={() => handleClickInProgress(row.id)}
                          className="w-[110px]"
                        >
                          En traitement
                        </Button>
                        <Button
                          variant="outlined"
                          color={row.status === 'ONDELIVERY' ? 'info' : 'gray'}
                          size="small"
                          onClick={() => {
                            handleClickOnDelivery(row.id);
                          }}
                          className="w-[100px]"
                        >
                          En livraison
                        </Button>
                        <Button
                          variant="outlined"
                          color={
                            row.status === 'DELIVERED' ? 'success' : 'gray'
                          }
                          size="small"
                          onClick={() => handleClickLivre(row.id)}
                        >
                          Livré
                        </Button>
                        <IconButton
                          size="small"
                          onClick={() => {
                            handleClickDetails(row.id as string);
                          }}
                        >
                          <Visibility />
                        </IconButton>
                        <div className="relative">
                          <IconButton size="small" color="secondary">
                            <Mail />
                          </IconButton>
                          <div className="absolute right-1 top-1 min-w-[8px] min-h-[8px] bg-red-500 rounded-full"></div>
                        </div>
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
          count={orderList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <PendingOrderFormDialog
        open={openPendingOrderForm}
        setOpen={setOpenPendingOrderForm}
      />

      <InDeliveryOrderFormDialog
        open={openInDeliveryOrderForm}
        setOpen={setOpenInDeliveryOrderForm}
      />
    </Box>
  );
}
