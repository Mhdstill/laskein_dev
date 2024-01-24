import React, { ChangeEvent } from 'react';

import Close from '@mui/icons-material/Close';
import Visibility from '@mui/icons-material/Visibility';

import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ArticleDTO from 'data/dto/Article.dto';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import ArticleDetails from '../../../article/articles/ArticleDetails';
import { MuiContainedButton } from './styles';

import CloseRounded from '@mui/icons-material/CloseRounded';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import Euro from '@mui/icons-material/Euro';
import Save from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import KeyValue from 'components/shared/KeyValue';
import OSTextField from 'components/shared/input/OSTextField';
import TableLoading from 'components/shared/loading/TableLoading';
import BoxArticleDTO from 'data/dto/BoxArticle.dto';
import { Form, Formik, FormikValues } from 'formik';
import { useConfirm } from 'material-ui-confirm';
import { useRouter } from 'next/router';
import { getArticle } from 'services/redux/article/_';
import {
  deleteBoxArticle,
  editBoxArticle,
  updateBoxArticle,
} from 'services/redux/box/box-article';
import { cancelEditBoxArticle } from 'services/redux/box/box-article/boxArticleSlice';
import { getBox } from 'services/redux/box/useCase/get';
import { updateBox } from 'services/redux/box/useCase/update';
import * as Yup from 'yup';
import useFetchAllBoxArticle from './hooks/useFetchBoxArticle';

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
  id: keyof ArticleDTO;
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
    id: 'designation',
    numeric: false,
    disablePadding: false,
    label: 'Désignation',
  },
  {
    id: 'winningChance',
    numeric: true,
    disablePadding: false,
    label: 'Chance de gains',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  // eslint-disable-next-line no-unused-vars
  onRequestSort: (
    // eslint-disable-next-line no-unused-vars
    event: React.MouseEvent<unknown>,
    // eslint-disable-next-line no-unused-vars
    property: keyof ArticleDTO
  ) => void;
  // eslint-disable-next-line no-unused-vars
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof ArticleDTO) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          {/* <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          /> */}
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
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

export default function SelectedArticleTable() {
  const { boxArticleList, boxArticle, isEditing, loading } = useAppSelector(
    (state) => state.boxArticle
  );

  const { box } = useAppSelector((state) => state.box);

  const [open, setOpen] = React.useState(false);

  const [openEditWinningChance, setOpenEditWinningChance] =
    React.useState(false);

  const fetchBoxArticle = useFetchAllBoxArticle();

  const router = useRouter();
  const boxId = router.query?.id;

  React.useEffect(() => {
    if (boxId) {
      fetchBoxArticle();
    }
  }, [boxId]);

  const showArticleDetails = (id: string) => {
    dispatch(
      getArticle({
        id: id,
        args: {
          include: {
            articlePhoto: true,
            box: true,
            provider: true,
            subCategory: true,
            unitySize: true,
          },
        },
      })
    );
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseEditWinningChance = () => {
    setOpenEditWinningChance(false);
  };

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof ArticleDTO>('reference');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [selected, setSelected] = React.useState<readonly string[]>([]);

  const handleRequestSort = (event: any, property: keyof ArticleDTO) => {
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
      stableSort<ArticleDTO | any>(
        boxArticleList,
        getComparator(order, orderBy)
      ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [boxArticleList, order, orderBy, page, rowsPerPage]
  );

  const [boxPrice, setBoxPrice] = React.useState<number>(box?.price as number);

  const dispatch = useAppDispatch();

  const confirm = useConfirm();

  const handleclickDelete = async (id: string) => {
    confirm({
      title: 'Supprimer',
      description: "Voulez-vous supprimer l'article de ce box ?",
      cancellationText: 'Annuler',
      confirmationText: 'Supprimer',
      cancellationButtonProps: {
        color: 'warning',
      },
      confirmationButtonProps: {
        color: 'error',
      },
    }).then(async () => {
      await dispatch(deleteBoxArticle({ id }));
      fetchBoxArticle();
    });
  };

  const [totalChance, setTotalChance] = React.useState<number>(0);

  React.useEffect(() => {
    let sumWinningChance = 0;
    for (const boxArticle of boxArticleList) {
      sumWinningChance = sumWinningChance + boxArticle?.winningChance!;
    }
    setTotalChance(sumWinningChance);
  }, [boxArticleList]);

  React.useEffect(() => {
    if (boxArticle && isEditing) {
      // enlever d'abord le winning chance de l'article séléctionner de la totalité de la chance
      setTotalChance(() => totalChance - Number(boxArticle.winningChance));
    }
  }, [isEditing]);

  const [editBoxPrice, setEditBoxPrice] = React.useState<boolean>(false);

  return (
    <div className="bg-white w-full">
      <div className="flex flex-col gap-2 p-2.5">
        <div className="flex w-full justify-between items-start">
          <Typography variant="body1" color="primary" className="w-full">
            Liste des articles disponibles dans le box
          </Typography>
          <p className="flex items-center w-full">
            <span className="text-[#2F435E] text-[14px] font-bold">
              Pourcentage total :
            </span>
            <span className="text-white text-[12px] bg-[#376F70] px-3 py-0.5 leading-[20px] rounded-full">
              {totalChance.toFixed(2)} %
            </span>
          </p>
        </div>

        <div className="w-full flex gap-2.5 justify-between">
          <div className="w-full">
            <KeyValue title="Reference" value={box?.reference} />
          </div>
          <div className="w-full">
            <KeyValue title="Nom" value={box?.name} />
          </div>
        </div>
        <div className="w-full flex gap-2.5 justify-end items-center">
          <div className="w-full">
            <KeyValue title="Catégorie" value={box?.boxType?.name} />
          </div>
          <div className="w-full flex gap-1">
            <span className="text-[#2F435E] text-[14px] font-bold w-1/4 items-center flex ">
              Prix :
            </span>
            <TextField
              name="price"
              variant="outlined"
              size="small"
              type="number"
              label="Prix"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={boxPrice ? boxPrice : box?.price}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setBoxPrice(Number(event.target.value));
              }}
              onKeyDown={() => {
                setEditBoxPrice(true);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    className="cursor-pointer"
                    onClick={
                      editBoxPrice
                        ? async () => {
                            // update box here
                            const res = await dispatch(
                              updateBox({
                                id: box?.id!,
                                box: {
                                  reference: box?.reference!,
                                  name: box?.name!,
                                  price: Number(boxPrice),
                                },
                              })
                            );
                            if (res) {
                              dispatch(
                                getBox({
                                  id: String(boxArticle.boxId),
                                  args: {
                                    include: {
                                      boxImage: true,
                                      boxType: true,
                                    },
                                  },
                                })
                              );
                              setEditBoxPrice(false);
                            }
                          }
                        : () => {}
                    }
                  >
                    {editBoxPrice ? (
                      <Save className="text-green-600" />
                    ) : (
                      <Euro className="text-gray-400" />
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </div>
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
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={boxArticleList.length}
              />

              <TableBody>
                {visibleRows.map((row: BoxArticleDTO, index) => {
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
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row?.article?.reference}
                      </TableCell>
                      <TableCell>{row?.article?.designation}</TableCell>
                      <TableCell>
                        <div className="flex items-center rounded-full w-auto text-sm">
                          {row?.winningChance?.toFixed(2)} %
                          <IconButton
                            size="small"
                            className="w-5 h-5"
                            onClick={() => {
                              setOpenEditWinningChance(true);
                              dispatch(editBoxArticle({ id: row.id }));
                            }}
                          >
                            <Edit className="w-4" />
                          </IconButton>
                        </div>
                      </TableCell>
                      <TableCell width={100}>
                        <IconButton
                          size="small"
                          onClick={() => showArticleDetails(row.article?.id!)}
                        >
                          <Visibility />
                        </IconButton>
                        <IconButton
                          onClick={() => handleclickDelete(row?.id!)}
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
            count={boxArticleList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          <div className="w-full flex items-center justify-between">
            <Typography variant="h5" color="primary">
              Details du Produit
            </Typography>
            <MuiContainedButton
              startIcon={<Close />}
              variant="contained"
              color="warning"
              onClick={handleClose}
              className="bg-orange-400 text-white"
            >
              Fermer
            </MuiContainedButton>
          </div>
        </DialogTitle>
        <div className="pl-4">
          <ArticleDetails />
        </div>
      </Dialog>

      <Dialog
        open={openEditWinningChance}
        onClose={handleCloseEditWinningChance}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          <div className="w-full flex items-center justify-between">
            <Typography variant="h5" color="primary">
              Chance de gains de l&apos;article
            </Typography>
          </div>
        </DialogTitle>
        <div className="pl-4">
          <Formik
            initialValues={{
              winningChance: isEditing ? boxArticle.winningChance : 0,
            }}
            validationSchema={Yup.object({
              winningChance: Yup.number().required('Champ obligatoire'),
            })}
            enableReinitialize
            onSubmit={async (value: FormikValues | BoxArticleDTO) => {
              if (totalChance + Number(value.winningChance) > 100) {
                confirm({
                  title: 'Erreur',
                  description:
                    'La somme des pourcentages de chance de gains est déjà supérieur à 100. Ajuster le pourcentage de chance de ce box',
                  cancellationText: 'Annuler',
                  cancellationButtonProps: {
                    color: 'warning',
                  },
                });
                return;
              } else {
                await dispatch(
                  updateBoxArticle({
                    id: boxArticle.id as string,
                    boxArticle: {
                      winningChance: Number(value.winningChance),
                    },
                  })
                );
                // updates
                setSelected([]);
                fetchBoxArticle();
                handleCloseEditWinningChance();
                dispatch(cancelEditBoxArticle());
              }
            }}
          >
            {(formikProps) => (
              <Form className="flex flex-col gap-2 pb-3 pr-3">
                <OSTextField name="winningChance" size="small" />
                <div className="flex gap-2 w-full justify-end">
                  <Button
                    variant="contained"
                    color="warning"
                    startIcon={<CloseRounded />}
                    className="!bg-orange-500 !normal-case text-white"
                    onClick={() => {
                      formikProps.resetForm();
                      dispatch(cancelEditBoxArticle());
                      fetchBoxArticle();
                      handleCloseEditWinningChance();
                    }}
                  >
                    Annuler
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    className="bg-[#376F70]"
                  >
                    Enregistrer
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Dialog>
    </div>
  );
}
