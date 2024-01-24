import { Search, Visibility } from '@mui/icons-material';
import Article from '@mui/icons-material/Article';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { useConfirm } from 'material-ui-confirm';
import { useRouter } from 'next/router';
import React from 'react';

import { TablePagination } from '@mui/material';
import TableLoading from 'components/shared/loading/TableLoading';
import EnhancedTableHead, {
  HeadCell,
  getComparator,
  stableSort,
} from 'components/shared/table/Head';
import EnhancedTableToolbar from 'components/shared/table/Toolbar';
import { Order } from 'data/constant';
import ArticleDTO from 'data/dto/Article.dto';
import { debounce } from 'lodash';
import {
  deleteArticle,
  editArticle,
  getArticle,
} from 'services/redux/article/_';
import {
  cancelEditArticle,
  setActiveUi,
} from 'services/redux/article/_/articleSlice';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
// import useFetchCategoryListe from '../categories/hooks/useFetchCategoryList';
// import useFetchSubCategoryListe from '../categories/hooks/useFetchSubCategoryList';
import useFetchArticleListe from './hooks/useFetchArticleList';

const headCells: HeadCell[] = [
  {
    id: 'reference',
    numeric: false,
    disablePadding: true,
    label: 'Référence',
  },
  {
    id: 'designation',
    numeric: true,
    disablePadding: false,
    label: 'Designation',
  },
  {
    id: 'provider',
    numeric: true,
    disablePadding: false,
    label: 'Fournisseur',
  },
  {
    id: 'category',
    numeric: true,
    disablePadding: false,
    label: 'Catégorie',
  },
  {
    id: 'subCategory',
    numeric: true,
    disablePadding: false,
    label: 'Sous catégorie',
  },
];

export default function ArticleTable() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof ArticleDTO>('reference');
  const dispatch = useAppDispatch();
  const [key, setKey] = React.useState<string>('');
  // eslint-disable-next-line no-unused-vars
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const { articleList, loading, reloadArticle } = useAppSelector(
    (state) => state.article
  );
  const confirm = useConfirm();
  const router = useRouter();
  // const [subCategory, setSubCategory] = React.useState<any>('');
  // const [category, setCategory] = React.useState<any>('');
  // const { categoryList } = useAppSelector((state) => state.category);
  // const { subCategoryList } = useAppSelector((state) => state.subCategory);

  const fetchArticleList = useFetchArticleListe();
  // const fetchCategoryList = useFetchCategoryListe();
  // const fetchSubCategoryList = useFetchSubCategoryListe();

  // React.useEffect(() => {
  //   fetchCategoryList();
  //   fetchSubCategoryList();
  // }, []);

  React.useEffect(() => {
    fetchArticleList();
  }, [router.query, reloadArticle]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof ArticleDTO
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - articleList.length) : 0;

  let visibleRows = React.useMemo(
    () =>
      stableSort<ArticleDTO | any>(
        articleList,
        getComparator(order, orderBy)
      ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [articleList, order, orderBy, page, rowsPerPage]
  );

  // Suppr Article -------------------------------------------
  const handleclickDelete = async (id: any) => {
    confirm({
      title: 'Supprimer Article',
      description: 'Voulez-vous vraiment supprimer cette Article ?',
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
        await dispatch(deleteArticle({ id }));
        fetchArticleList();
      })
      .catch(() => {});
  };

  //

  // click Detail--------------------------------------------

  const handleClickDetails = (articleId: string) => {
    dispatch(setActiveUi('details'));
    dispatch(cancelEditArticle());
    dispatch(
      getArticle({
        id: articleId,
        args: {
          include: {
            articlePhoto: true,
            box: true,
            provider: true,
            subCategory: true,
            unitySize: true,
            price: true,
          },
        },
      })
    );
  };

  //

  // recherch ---------------------------------------------

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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    if (router?.query?.search) {
      setKey(router.query.search as string);
    }

    // if (router?.query?.filter) {
    //   setSubCategory(router.query.filter);
    // }

    // if (router?.query?.filter) {
    //   setCategory(router.query.filter);
    // }
  }, [router.query.search, router.query.filter]);

  // const filterCategory = (category: string) => {
  //   const query = { ...router.query, filter: category };
  //   router.push({
  //     pathname: router.pathname,
  //     query: query,
  //   });
  // };

  // const filterSubCategory = (category: string) => {
  //   const query = { ...router.query, filter: category };
  //   router.push({
  //     pathname: router.pathname,
  //     query: query,
  //   });
  // };

  //

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar>
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

            {/* <FormControl fullWidth>
              <InputLabel className="-mt-2" id="demo-simple-select-label">
                Catégorie
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                size="small"
              >
                <MenuItem
                  selected
                  value={'basic'}
                  onClick={() => {
                    setCategory('');
                    filterCategory('');
                  }}
                >
                  Tous
                </MenuItem>

                {categoryList.map((currentCategory) => (
                  <MenuItem
                    key={currentCategory.id}
                    value={currentCategory.id}
                    onClick={() => {
                      setCategory(currentCategory?.name!);
                      filterCategory(currentCategory?.name!);
                    }}
                  >
                    {currentCategory.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel className="-mt-2" id="demo-simple-select-label">
                Sous catégorie
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                size="small"
              >
                <MenuItem
                  selected
                  value={'basic'}
                  onClick={() => {
                    setSubCategory('');
                    filterSubCategory('');
                  }}
                >
                  tous
                </MenuItem>
                {subCategoryList.map((currentSubCategory) => (
                  <MenuItem
                    key={currentSubCategory.id}
                    value={currentSubCategory.id}
                    onClick={() => {
                      setSubCategory(currentSubCategory?.name!);
                      filterSubCategory(currentSubCategory?.name!);
                    }}
                  >
                    {currentSubCategory.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}

            <TextField
              variant="outlined"
              size="small"
              placeholder="Recherche"
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
        </EnhancedTableToolbar>
        <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
          {loading && <TableLoading />}
          <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={articleList.length}
              headCells={headCells}
            />
            <TableBody>
              {visibleRows.map((row: ArticleDTO, index) => {
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
                    // sx={{ cursor: 'pointer' }}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" id={labelId} scope="row">
                      {row.reference}
                    </TableCell>
                    <TableCell>{row.designation}</TableCell>
                    <TableCell>
                      {row.provider ? row.provider?.companyName : 'Non définie'}
                    </TableCell>
                    <TableCell>{row.subCategory?.category?.name}</TableCell>
                    <TableCell>{row.subCategory?.name}</TableCell>

                    <TableCell>
                      <div className="flex gap-1 w-120">
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
                              editArticle({
                                id: row.id,
                                args: {
                                  include: { articlePhoto: true, price: true },
                                },
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
          count={articleList.length}
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
