import React from 'react';

import Article from '@mui/icons-material/Article';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import Tune from '@mui/icons-material/Tune';
import Visibility from '@mui/icons-material/Visibility';

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';

import Search from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TableLoading from 'components/shared/loading/TableLoading';
import EnhancedTableHead, {
  HeadCell,
  stableSort,
} from 'components/shared/table/Head';
import Pagination from 'components/shared/table/Pagination';
import BoxDTO from 'data/dto/Box.dto';
import BoxTypeDTO from 'data/dto/BoxType.dto';
import { debounce } from 'lodash';
import { useConfirm } from 'material-ui-confirm';
import { useRouter } from 'next/router';
import { getBoxTypeList } from 'services/redux/box/type';
import { deleteBox } from 'services/redux/box/useCase/delete';
import { editBox } from 'services/redux/box/useCase/edit';
import { getBox } from 'services/redux/box/useCase/get';
import { Order, getComparator } from 'utils/table.config';
import {
  cancelEditBox,
  setBoxId,
  toggleArticleInsideABox,
} from '../../../../services/redux/box/boxSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../services/redux/hooks';
import useFetchBoxList from './hooks/useFetchBoxList';

const headCells: HeadCell[] = [
  {
    id: 'reference',
    numeric: false,
    disablePadding: true,
    label: 'Référence',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Nom',
  },
  {
    id: 'type',
    numeric: false,
    disablePadding: false,
    label: 'Type',
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Prix',
  },
  {
    id: 'quantity',
    numeric: true,
    disablePadding: false,
    label: 'Nombre',
  },
];

export default function BoxTable() {
  const dispatch = useAppDispatch();
  const [order, setOrder] = React.useState<Order>('asc');
  const [key, setKey] = React.useState<string | string[]>('');
  const [boxTypeId, setBoxTypeId] = React.useState('') as any;
  const [orderBy, setOrderBy] = React.useState<keyof BoxDTO>('reference');
  // eslint-disable-next-line no-unused-vars
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(5);
  const { boxList, loading, reloadBox } = useAppSelector((state) => state.box);
  const confirm = useConfirm();
  const fetchBoxList = useFetchBoxList();
  const router = useRouter();

  React.useEffect(() => {
    fetchBoxList();
  }, [router.query, reloadBox]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof BoxDTO
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  let visibleRows = React.useMemo(
    () =>
      stableSort<BoxDTO | any>(boxList, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [boxList, order, orderBy, page, rowsPerPage]
  );

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

  const deboncedSearch = React.useCallback(debounce(search, 500), [
    router.query,
  ]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKey(event.target.value);
    deboncedSearch(event.target.value);
  };

  const handleChangeBoxType = (event: SelectChangeEvent) => {
    setBoxTypeId(event.target.value as string);
    const query = { ...router.query, boxTypeId: event.target.value as string };
    router.push({
      pathname: router.pathname,
      query: query,
    });
  };

  React.useEffect(() => {
    if (router?.query?.boxTypeId) {
      setBoxTypeId(router.query.boxTypeId);
    }
    if (router?.query?.search) {
      setKey(router.query.search);
    }
  }, [router.query.search, router.query.boxTypeId]);

  const handleclickDelete = async (id: any) => {
    confirm({
      title: 'Supprimer le box',
      description: 'Voulez-vous vraiment supprimer ce box ?',
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
        await dispatch(deleteBox({ id }));
        dispatch(cancelEditBox());
        fetchBoxList();
      })
      .catch(() => {});
  };

  const handleClickDetails = (boxId: string) => {
    dispatch(setBoxId(boxId));
    dispatch(
      getBox({
        id: boxId,
        args: {
          include: {
            boxImage: true,
            boxType: true,
          },
        },
      })
    );
  };

  const handleClickEdit = (boxId: string) => {
    dispatch(cancelEditBox());
    dispatch(
      editBox({
        id: boxId,
        args: {
          include: { boxImage: true, boxType: true },
        },
      })
    );
  };

  const handleClickShowArticle = (boxId: string) => {
    dispatch(
      getBox({
        id: boxId,
        args: {
          include: {
            boxType: true,
            boxImage: true,
            article: true,
          },
        },
      })
    );
    router.push(`/box?id=${boxId}`);
    dispatch(toggleArticleInsideABox(true));
  };

  React.useEffect(() => {
    dispatch(getBoxTypeList({}));
  }, [dispatch]);

  const { boxTypeList } = useAppSelector((state) => state.boxType);

  return (
    <div>
      {/* filter */}
      <div className="p-2.5 row flex lg:flex-row md:flex-row sm:flex-col w-full justify-between items-center lg:gap-10 md:gap-2 sm:gap-2">
        <Button
          variant="outlined"
          color="primary"
          className="!normal-case h-full text-[#376F70] border border-[#376F70] hover:border-[#376F70]"
          startIcon={<Article />}
        >
          Imprimer
        </Button>

        <div className="flex gap-2.5 lg:w-1/2 md:w-2/3 sm:w-full">
          <FormControl fullWidth>
            <InputLabel className="-mt-2" id="demo-simple-select-label">
              Type de box
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Type de box"
              size="small"
              value={boxTypeId}
              onChange={handleChangeBoxType}
            >
              <MenuItem value="all">Tous</MenuItem>
              {boxTypeList.map((boxType: BoxTypeDTO) => (
                <MenuItem key={boxType.id} value={boxType.id}>
                  {boxType.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Recherche"
            variant="outlined"
            size="small"
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

      {/* table */}
      <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
        {loading && <TableLoading />}
        <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={boxList.length}
            headCells={headCells}
          />
          <TableBody>
            {visibleRows.map((row: BoxDTO) => (
              <TableRow
                key={row.reference}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.reference}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.boxType?.name}</TableCell>
                <TableCell>{row.price} $</TableCell>
                <TableCell>{row.number}</TableCell>
                <TableCell width={230}>
                  <Button
                    variant="outlined"
                    size="small"
                    color="warning"
                    startIcon={<Tune />}
                    className="mr-1"
                    onClick={() => {
                      handleClickShowArticle(row.id as string);
                    }}
                  >
                    Article
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
                    onClick={() => handleClickEdit(row.id as string)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleclickDelete(row.id)}
                    size="small"
                    color="error"
                    className="text-red-500"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination list={boxList} page={page} setPage={setPage} />
    </div>
  );
}
