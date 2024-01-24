import React from 'react';

import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import Message from '@mui/icons-material/Message';
import Search from '@mui/icons-material/Search';
import Visibility from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import classNames from 'classnames';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import {
  defaultLabelDisplayedRows,
  labelRowsPerPage,
} from 'utils/table.config';
import useFetchMemberListe from './hooks/useFetchMemberList';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import TableLoading from 'components/shared/loading/TableLoading';
import { useConfirm } from 'material-ui-confirm';
import { deleteMember, editMember } from 'services/redux/users/member';

export const MemberTable = ({ setActiveUi }: any) => {
  const [page, setPage] = React.useState(0);
  const dispatch = useAppDispatch();
  const confirm = useConfirm();
  const router = useRouter();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const fetchList = useFetchMemberListe();
  const [key, setKey] = React.useState<any>('');
  const { memberList, loading, reloadMember } = useAppSelector(
    (state) => state.member
  );
  const [compte, setCompte] = React.useState('') as any;

  React.useEffect(() => {
    fetchList();
  }, [router.query, reloadMember]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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

  const handleChangeCompte = (event: SelectChangeEvent) => {
    // setCompte(event.target.value as string);
    const query = { ...router.query, status: event.target.value as string };
    router.push({
      pathname: router.pathname,
      query: query,
    });
  };

  React.useEffect(() => {
    if (router?.query?.status) {
      setCompte(router.query.status);
    }
  }, [router.query.status]);

  const handleclickDelete = async (id: any) => {
    confirm({
      title: 'Supprimer Membre',
      description: 'Voulez-vous vraiment supprimer ce Membre ?',
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
        await dispatch(deleteMember({ id }));
        fetchList();
      })
      .catch(() => {});
  };

  const handleClickDetals = (memeberId: any) => {
    setActiveUi('details');
    dispatch(
      editMember({
        id: memeberId,
        args: {
          select: {
            id: true,
            address: true,
            email: true,
            firstName: true,
            isActif: true,
            lastName: true,
            phone: true,
            photoUrl: true,
            password: false,
            socketId: true,
            rule: true,
            ruleId: true,
            username: true,
            wallet: true,
          },
        },
      })
    );
  };

  const handleClickEdit = (memeberId: any) => {
    setActiveUi('form');
    dispatch(
      editMember({
        id: memeberId,
        args: {
          select: {
            id: true,
            address: true,
            email: true,
            firstName: true,
            isActif: true,
            lastName: true,
            phone: true,
            photoUrl: true,
            password: false,
            socketId: true,
            rule: true,
            ruleId: true,
            username: true,
            wallet: true,
          },
        },
      })
    );
  };

  return (
    <div>
      {/* filter */}
      <div className="p-2.5 lg:row flex lg:flex-row md:flex-row sm:flex-col w-full justify-between items-center lg:gap-10 md:gap-2.5 sm:gap-2">
        <div className="w-full">
          {/* <Button
            variant="outlined"
            color="primary"
            className="!normal-case h-full text-[#376F70] border border-[#376F70] hover:border-[#376F70]"
            startIcon={<Article />}
          >
            Imprimer
          </Button> */}
        </div>

        <FormControl fullWidth>
          <InputLabel className="-mt-2" id="demo-simple-select-label">
            Statut
          </InputLabel>
          <Select
            disabled
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            size="small"
          >
            <MenuItem selected value={'able'}>
              Active
            </MenuItem>
            <MenuItem value={'all'}>tous</MenuItem>
            <MenuItem value={'disabled'}>Desactivé</MenuItem>
            <MenuItem value={'to confirme'}>A confirmer</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel className="-mt-2" id="demo-simple-select-label">
            Status
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Compte"
            size="small"
            value={compte}
            onChange={handleChangeCompte}
          >
            <MenuItem value={'all'}>tous</MenuItem>
            <MenuItem value={'true'}>Active</MenuItem>
            <MenuItem value={'false'}>Desactivé</MenuItem>
          </Select>
        </FormControl>

        <TextField
          variant="outlined"
          size="small"
          placeholder="Recherche"
          value={key}
          onChange={handleChange}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search className="text-gray-400" />
              </InputAdornment>
            ),
          }}
        />
      </div>

      {/* table */}
      <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
        {loading && <TableLoading />}
        <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Prénom</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Solde</TableCell>
              {/* <TableCell>Compte</TableCell> */}
              <TableCell>Statut</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {memberList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.firstName}
                  </TableCell>
                  <TableCell>{row.lastName}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row?.wallet?.balance} $</TableCell>
                  {/* <TableCell width={205}>
                    <MuiOutlinedButton
                      variant="outlined"
                      className="rounded-full shadow-none !normal-case w-[100px]"
                      fullWidth
                      size="small"
                      sx={{
                        borderRadius: 30,
                        border: '1px solid #376F70',
                        '&:hover': {
                          borderRadius: 30,
                          border: '1px solid #376F70',
                        },
                      }}
                    >
                      {row.socketId ? ' En ligne' : 'hors ligne'}
                    </MuiOutlinedButton>
                  </TableCell> */}
                  <TableCell width={205}>
                    <Button
                      variant="contained"
                      className={classNames(
                        'rounded-full shadow-none !normal-case',
                        row.isActif
                          ? 'bg-[#376F70] hover:bg-[#4c8b8c]'
                          : 'bg-[#FBA048] hover:bg-[#feb36c]'
                      )}
                      fullWidth
                      sx={{
                        borderRadius: 30,
                        boxShadow: 'none',
                        background: '#4c8b8c',
                        '&:hover': {
                          background: '#4c8b8c',
                        },
                      }}
                      size="small"
                    >
                      {row.isActif ? 'Activé' : 'Desactivé'}
                    </Button>
                  </TableCell>

                  <TableCell>
                    <div className="w-[140px]">
                      <IconButton
                        size="small"
                        onClick={() => handleClickDetals(row.id)}
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="info"
                        className="text-[#376F70]"
                        sx={{
                          color: '#376F70',
                        }}
                        onClick={() => {
                          handleClickEdit(row.id);
                        }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton size="small" color="info">
                        <Message />
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
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={memberList.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelDisplayedRows={defaultLabelDisplayedRows}
        labelRowsPerPage={labelRowsPerPage}
      />
    </div>
  );
};
