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
import PriceDTO from 'data/dto/Price.dto';
import { debounce } from 'lodash';
import { useConfirm } from 'material-ui-confirm';
import { useRouter } from 'next/router';
import { deletePrice, editPrice } from 'services/redux/article/price';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import useFetchArticleListeFiltered from '../articles/hooks/useFetchArticleListFiltered';
import useFetchPricListe from './hooks/useFetchPriceList';

const headCells: HeadCell[] = [
  {
    id: 'reference',
    numeric: false,
    disablePadding: true,
    label: 'Référence',
  },
  {
    id: 'currentPrice',
    numeric: true,
    disablePadding: false,
    label: 'Prix actuel',
  },
  {
    id: 'oldPrice',
    numeric: true,
    disablePadding: false,
    label: 'Ancien prix',
  },
  {
    id: 'rate',
    numeric: true,
    disablePadding: false,
    label: 'Taux',
  },
  {
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: 'Reduction',
  },
];

export default function SubCategoryTable() {
  const dispatch = useAppDispatch();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof PriceDTO>('reference');
  // eslint-disable-next-line no-unused-vars
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(5);
  const fetchArticleList = useFetchArticleListeFiltered();
  const { priceList, loading, reloadPrice } = useAppSelector(
    (state) => state.price
  );
  const confirm = useConfirm();
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

  const fetchPriceList = useFetchPricListe();
  React.useEffect(() => {
    fetchPriceList();
    fetchArticleList();
  }, [router.query, reloadPrice]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof PriceDTO
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - priceList.length) : 0;

  let visibleRows = React.useMemo(
    () =>
      stableSort<PriceDTO | any>(
        priceList,
        getComparator(order, orderBy)
      ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [priceList, order, orderBy, page, rowsPerPage]
  );

  const handleclickDelete = async (id: any) => {
    confirm({
      title: 'Supprimer Le Prix',
      description: 'Voulez-vous vraiment supprimer ce Prix ?',
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
        await dispatch(deletePrice({ id }));
        fetchPriceList();
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
              rowCount={priceList.length}
              headCells={headCells}
            />
            <TableBody>
              {visibleRows.map((row: PriceDTO, index) => {
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
                    <TableCell>{row.currentPrice}</TableCell>
                    <TableCell>{row.oldPrice}</TableCell>
                    <TableCell>{row.rate}</TableCell>
                    <TableCell>{row.reduction}</TableCell>

                    <TableCell width={100}>
                      <div className="flex gap-1 w-20">
                        <IconButton
                          size="small"
                          color="secondary"
                          onClick={async () => {
                            await dispatch(editPrice({ id: row.id }));
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

        <Pagination list={priceList} page={page} setPage={setPage} />
      </Paper>
    </Box>
  );
}
