import React, { useState } from 'react';

import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';

import Article from '@mui/icons-material/Article';
import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
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
import EnhancedTableToolbar from 'components/shared/table/Toolbar';
import { Order } from 'data/constant';
import SubCategoryDTO from 'data/dto/SubCategory.dto';
import { debounce } from 'lodash';
import { useConfirm } from 'material-ui-confirm';
import { useRouter } from 'next/router';
import {
  deleteSubCategory,
  editSubCategory,
} from 'services/redux/article/sub-category';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import useFetchSubCategoryListe from '../hooks/useFetchSubCategoryList';

const headCells: HeadCell[] = [
  {
    id: 'reference',
    numeric: false,
    disablePadding: true,
    label: 'Référence',
  },
  {
    id: 'category',
    numeric: true,
    disablePadding: false,
    label: 'Sous catégorie',
  },
  {
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: 'Catégorie',
  },
];

export default function SubCategoryTable() {
  const dispatch = useAppDispatch();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] =
    React.useState<keyof SubCategoryDTO>('reference');
  // eslint-disable-next-line no-unused-vars
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(5);
  const { reloadCategory } = useAppSelector((state) => state.category);
  const { subCategoryList, reloadSubCategory } = useAppSelector(
    (state) => state.subCategory
  );
  const confirm = useConfirm();
  const { loading } = useAppSelector((state) => state.subCategory);
  const router = useRouter();
  const [key, setKey] = useState<any>('');
  React.useEffect(() => {
    if (router?.query?.search) {
      setKey(router.query.search);
    }
  }, [router.query.search]);

  const search = (key: string) => {
    const query = { ...router.query, search: key };
    router.push({
      pathname: router.pathname,
      query: query,
    });
  };
  const deboncedSearch = React.useCallback(debounce(search, 300), [
    router.query,
  ]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKey(event.target.value);
    deboncedSearch(event.target.value);
  };

  const fetchSubCategoryList = useFetchSubCategoryListe();
  React.useEffect(() => {
    fetchSubCategoryList();
  }, [router.query, reloadSubCategory, reloadCategory]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof SubCategoryDTO
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - subCategoryList.length)
      : 0;

  let visibleRows = React.useMemo(
    () =>
      stableSort<SubCategoryDTO | any>(
        subCategoryList,
        getComparator(order, orderBy)
      ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [subCategoryList, order, orderBy, page, rowsPerPage]
  );

  const handleclickDelete = async (id: any) => {
    confirm({
      title: 'Supprimer sous categorie',
      description: 'Voulez-vous vraiment supprimer ce sous catégorie ?',
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
        await dispatch(deleteSubCategory({ id }));
        fetchSubCategoryList();
      })
      .catch(() => {});
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar>
          <div className="p-2.5 row flex w-full justify-between items-center lg:gap-10 md:gap-2 sm:gap-2">
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

            <TextField
              label="Recherche"
              variant="outlined"
              size="small"
              value={key}
              onChange={handleChange}
            />
          </div>
        </EnhancedTableToolbar>
        <TableContainer>
          {loading && <TableLoading />}
          <Table aria-labelledby="tableTitle" size={'small'}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={subCategoryList.length}
              headCells={headCells}
            />
            <TableBody>
              {visibleRows.map((row: SubCategoryDTO, index) => {
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
                    <TableCell>{row?.category?.name}</TableCell>

                    <TableCell width={100}>
                      <div className="flex gap-1 w-20">
                        <IconButton
                          size="small"
                          color="secondary"
                          onClick={async () => {
                            await dispatch(editSubCategory({ id: row.id }));
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

        <Pagination list={subCategoryList} page={page} setPage={setPage} />
      </Paper>
    </Box>
  );
}
