import React from 'react';

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
import useFetchArticleListe from 'components/pages/article/articles/hooks/useFetchArticleList';
import ArticleDTO from 'data/dto/Article.dto';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import ArticleDetails from '../../../article/articles/ArticleDetails';
import { MuiContainedButton } from './styles';

import Search from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import TableLoading from 'components/shared/loading/TableLoading';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import { getArticle } from 'services/redux/article/_';

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
    id: 'size',
    numeric: true,
    disablePadding: false,
    label: 'Quantité',
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
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
            align={headCell.numeric ? 'right' : 'left'}
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

interface AvalaibleArticleTableProps {
  selected: readonly string[];
  // eslint-disable-next-line no-unused-vars
  setSelected: (items: readonly string[]) => void;
}

export default function AvalaibleArticleTable({
  selected,
  setSelected,
}: AvalaibleArticleTableProps) {
  const fetchArticles = useFetchArticleListe();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    fetchArticles();
  }, [dispatch]);

  const { articleList, loading } = useAppSelector((state) => state.article);

  const [open, setOpen] = React.useState(false);

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

  const router = useRouter();
  const [key, setKey] = React.useState<string>('');
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof ArticleDTO>('reference');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event: any, property: keyof ArticleDTO) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = articleList.map((n) => n.reference);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
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
        articleList,
        getComparator(order, orderBy)
      ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [articleList, order, orderBy, page, rowsPerPage]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKey(event.target.value);
    deboncedSearch(event.target.value);
  };

  const search = (key: string) => {
    const query = { ...router.query, search: key };
    router.push({
      pathname: router.pathname,
      query: query,
    });
  };

  const deboncedSearch = React.useCallback(debounce(search, 500), [
    router.query,
  ]);

  React.useEffect(() => {
    if (router?.query?.search) {
      setKey(router.query.search as string);
    }
  }, [router.query.search]);

  return (
    <div className="bg-white w-full">
      <div className="flex flex-col gap-2 p-2.5">
        <Typography variant="body1" color="primary">
          Liste des tous les articles disponibles
        </Typography>
        {/* <div className="w-full flex gap-2.5 justify-end">
          <FormControl fullWidth>
            <InputLabel className="-mt-2" id="demo-simple-select-label">
              Catégorie
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="category"
              size="small"
              defaultValue=""
            >
              <MenuItem selected value={'cat1'}>
                catégory 1
              </MenuItem>
              <MenuItem value={'cat2'}>catégory 2</MenuItem>
              <MenuItem value={'cat3'}>catégory 3</MenuItem>
            </Select>
          </FormControl>{' '}
          <FormControl fullWidth>
            <InputLabel className="-mt-2" id="demo-simple-select-label">
              Sous catégorie
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="category"
              size="small"
              defaultValue=""
            >
              <MenuItem selected value={'scat1'}>
                Sous catégorie 1
              </MenuItem>
              <MenuItem value={'scat2'}>Sous catégorie 2</MenuItem>
              <MenuItem value={'scat3'}>Sous catégorie 3</MenuItem>
            </Select>
          </FormControl>
        </div> */}
        <div className="w-full flex gap-2.5 justify-end">
          {/* <FormControl fullWidth>
            <InputLabel className="-mt-2" id="demo-simple-select-label">
              Fournisseur
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="category"
              size="small"
              defaultValue=""
            >
              <MenuItem selected value={'frs1'}>
                Fournisseur 1
              </MenuItem>
              <MenuItem value={'frs2'}>Fournisseur 2</MenuItem>
              <MenuItem value={'frs3'}>Fournisseur 3</MenuItem>
            </Select>
          </FormControl> */}
          <TextField
            name="searchfield"
            variant="outlined"
            size="small"
            label="Rechercher"
            fullWidth
            value={key}
            onChange={handleChange}
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
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={articleList.length}
              />

              <TableBody>
                {visibleRows.map((row, index) => {
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
                        {row?.reference}
                      </TableCell>
                      <TableCell>{row?.designation}</TableCell>
                      <TableCell>{row?.size}</TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => showArticleDetails(row?.id!)}
                        >
                          <Visibility />
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
            count={articleList.length}
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
    </div>
  );
}
