import React from 'react';

import Article from '@mui/icons-material/Article';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import Message from '@mui/icons-material/Message';
import Search from '@mui/icons-material/Search';
import Visibility from '@mui/icons-material/Visibility';
import InputAdornment from '@mui/material/InputAdornment';

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
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import classNames from 'classnames';
import TableLoading from 'components/shared/loading/TableLoading';
import UserDTO from 'data/dto/User.dto';
import { debounce } from 'lodash';
import { useConfirm } from 'material-ui-confirm';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { deleteUtilisateur, editUtilisateur } from 'services/redux/users/admin';
import {
  defaultLabelDisplayedRows,
  labelRowsPerPage,
} from 'utils/table.config';
import useFetchRoleListe from '../rule/_/hooks/useFetchRoleList';
import useFetchUserListe from './hooks/useFetchUserList';
import { MuiOutlinedButton } from './styles';

export default function UserTable({ setActiveUi }: any) {
  const [page, setPage] = React.useState(0);
  const dispatch = useAppDispatch();
  const confirm = useConfirm();
  const router = useRouter();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const fetchList = useFetchUserListe();
  const [key, setKey] = React.useState<any>('');
  const [compte, setCompte] = React.useState('') as any;
  const [roleId, setRoleId] = React.useState('') as any;
  const { utilisateurList, loading, reloadUtilisateur } = useAppSelector(
    (state) => state.utilisateur
  );
  const fetchRoleListe = useFetchRoleListe();
  const { roleList } = useAppSelector((state) => state.role);

  React.useEffect(() => {
    fetchList();
    fetchRoleListe();
  }, [router.query, reloadUtilisateur]);

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

  const handleclickDelete = async (id: any) => {
    confirm({
      title: 'Supprimer Utilisateur',
      description: 'Voulez-vous vraiment supprimer cette Utilisateur ?',
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
        await dispatch(deleteUtilisateur({ id }));
        fetchList();
      })
      .catch(() => {});
  };

  const handleClickDetals = (utilisateurId: any) => {
    setActiveUi('details');
    dispatch(
      editUtilisateur({
        id: utilisateurId,
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
          },
        },
      })
    );
  };

  const handleClickEdit = (utilisateurId: any) => {
    setActiveUi('form');
    dispatch(
      editUtilisateur({
        id: utilisateurId,
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
          },
        },
      })
    );
  };

  const handleChangeCompte = (event: SelectChangeEvent) => {
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

  const handleChangeRole = (event: SelectChangeEvent) => {
    const query = { ...router.query, role: event.target.value as string };
    router.push({
      pathname: router.pathname,
      query: query,
    });
  };

  React.useEffect(() => {
    if (router?.query?.role) {
      setRoleId(router.query.role);
    }
  }, [router.query.role]);

  return (
    <div>
      {/* filter */}
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

        <FormControl fullWidth>
          <InputLabel className="-mt-2" id="demo-simple-select-label">
            Rôle
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Rôle"
            size="small"
            value={roleId}
            onChange={handleChangeRole}
          >
            <MenuItem selected value={'all'}>
              tous
            </MenuItem>
            {roleList.map((row) => (
              <MenuItem key={row.id} value={row.id}>
                {row.name}
              </MenuItem>
            ))}
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
              <TableCell>Identifiant</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Rôle</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {utilisateurList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: UserDTO) => (
                <TableRow
                  key={row?.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row?.firstName}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row?.lastName}
                  </TableCell>
                  <TableCell>{row?.username}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell width={205}>
                    <MuiOutlinedButton
                      variant="outlined"
                      className="rounded-full shadow-none !normal-case"
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
                      {row.rule?.name ? row.rule?.name : 'none'}
                    </MuiOutlinedButton>
                  </TableCell>
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
                    <div className="flex gap-1 w-[170px]">
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
        count={utilisateurList.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelDisplayedRows={defaultLabelDisplayedRows}
        labelRowsPerPage={labelRowsPerPage}
      />
    </div>
  );
}
