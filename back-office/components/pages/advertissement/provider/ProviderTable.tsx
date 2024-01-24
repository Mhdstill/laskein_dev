import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import useFetchProviderListe from 'components/pages/article/providers/hooks/useFetchProviderList';
import TableLoading from 'components/shared/loading/TableLoading';
import EnhancedTableHead, {
  HeadCell,
  getComparator,
  stableSort,
} from 'components/shared/table/Head';
import Pagination from 'components/shared/table/Pagination';
import EnhancedTableToolbar from 'components/shared/table/Toolbar';
import { Order } from 'data/constant';
import ProviderDTO from 'data/dto/Provider.dto';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import { useAppSelector } from 'services/redux/hooks';

const headCells: HeadCell[] = [
  {
    id: 'reference',
    numeric: false,
    disablePadding: true,
    label: 'Référence',
  },
  {
    id: 'companyName',
    numeric: true,
    disablePadding: false,
    label: 'Raison Social',
  },
  {
    id: 'address',
    numeric: true,
    disablePadding: false,
    label: 'Adresse',
  },
];

type ProviderTableProps = {
  title: string;
  selected: readonly string[];
  // eslint-disable-next-line no-unused-vars
  setSelected: (newSelected: readonly string[]) => void;
  providerList: ProviderDTO[];
};

export default function ProviderTable(props: ProviderTableProps) {
  const { title, selected, setSelected, providerList } = props;
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof ProviderDTO>('reference');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(5);
  const { loading, reloadProvider } = useAppSelector((state) => state.provider);
  const router = useRouter();
  // eslint-disable-next-line no-unused-vars
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

  // eslint-disable-next-line no-unused-vars
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKey(event.target.value);
    deboncedSearch(event.target.value);
  };

  const fetchProviderList = useFetchProviderListe();
  React.useEffect(() => {
    fetchProviderList();
  }, [router.query, reloadProvider]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof ProviderDTO
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - providerList.length) : 0;

  let visibleRows = React.useMemo(
    () =>
      stableSort<ProviderDTO | any>(
        providerList,
        getComparator(order, orderBy)
      ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [providerList, order, orderBy, page, rowsPerPage]
  );

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

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar>
          <div className="flex flex-col w-full">
            <Typography variant="h6">{title}</Typography>
            <div className="p-2.5 row flex w-full justify-end items-center lg:gap-10 md:gap-2 sm:gap-2">
              {/* <TextField
                label="Recherche"
                variant="outlined"
                size="small"
                value={key}
                onChange={handleChange}
              /> */}
            </div>
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
              rowCount={providerList.length}
              headCells={headCells}
              isSelectable
            />
            <TableBody>
              {visibleRows.map((row: ProviderDTO, index) => {
                const isItemSelected = isSelected(row.id as string);
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
                    <TableCell>
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row">
                      {row.reference.slice(0, 10) + '...'}
                    </TableCell>
                    <TableCell>{row.companyName}</TableCell>
                    <TableCell>{row.address}</TableCell>
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

        <Pagination list={providerList} page={page} setPage={setPage} />
      </Paper>
    </Box>
  );
}
