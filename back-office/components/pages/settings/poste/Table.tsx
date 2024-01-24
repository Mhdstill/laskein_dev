import React from 'react';

import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';

import { Visibility } from '@mui/icons-material';
import { TablePagination } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableLoading from 'components/shared/loading/TableLoading';
import PostDTO from 'data/dto/Post.dto';
import { useConfirm } from 'material-ui-confirm';
import { deletePost, editPost, getPost } from 'services/redux/post';
import { cancelEditPost, setActiveUi } from 'services/redux/post/postSlice';
import { Order } from '../../../../data/constant';
import UnitySizeDTO from '../../../../data/dto/UnitySize.dto';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../services/redux/hooks';
import EnhancedTableHead, {
  HeadCell,
  getComparator,
  stableSort,
} from '../../../shared/table/Head';
import useFetchPostListe from './hooks/useFetchPosteList';

const headCells: HeadCell[] = [
  {
    id: 'title',
    numeric: false,
    disablePadding: true,
    label: 'Titre',
  },
  {
    id: 'content',
    numeric: true,
    disablePadding: false,
    label: 'Contenu',
  },
  {
    id: 'postUrl',
    numeric: true,
    disablePadding: false,
    label: 'URL de publication',
  },
  {
    id: 'articleId',
    numeric: true,
    disablePadding: false,
    label: 'Article',
  },
];

export default function PosteTable() {
  const dispatch = useAppDispatch();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof PostDTO>('title');
  // eslint-disable-next-line no-unused-vars
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { postList, loading, reloadPost } = useAppSelector(
    (state) => state.post
  );
  const confirm = useConfirm();

  const fetchPostList = useFetchPostListe();
  React.useEffect(() => {
    fetchPostList();
  }, [reloadPost]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof PostDTO
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - postList.length) : 0;

  let visibleRows = React.useMemo(
    () =>
      stableSort<UnitySizeDTO | any>(
        postList,
        getComparator(order, orderBy)
      ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [postList, order, orderBy, page, rowsPerPage]
  );

  const getExcerpt = (name: string, maxLength: number) => {
    if (name.length <= maxLength) {
      return name;
    }
    return name.substring(0, maxLength) + '...';
  };

  const handleclickDelete = async (id: any) => {
    confirm({
      title: 'Supprimer ce Poste',
      description: 'Voulez-vous vraiment supprimer ce Post ?',
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
        await dispatch(deletePost({ id }));
        fetchPostList();
      })
      .catch(() => {});
  };

  const handleClickDetails = (postId: string) => {
    dispatch(setActiveUi('details'));
    dispatch(cancelEditPost());
    dispatch(
      getPost({
        id: postId,
        args: {
          include: {
            article: true,
          },
        },
      })
    );
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        {/* <EnhancedTableToolbar>
        </EnhancedTableToolbar> */}
        <TableContainer>
          {loading && <TableLoading />}
          <Table aria-labelledby="tableTitle" size={'small'}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={postList.length}
              headCells={headCells}
            />
            <TableBody>
              {visibleRows.map((row: PostDTO | any, index) => {
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
                      {getExcerpt(row.title, 12)}
                    </TableCell>
                    <TableCell> {getExcerpt(row?.content, 15)}</TableCell>
                    <TableCell> {getExcerpt(row.postUrl, 15)}</TableCell>
                    <TableCell>
                      {getExcerpt(row.article.designation, 15)}
                    </TableCell>
                    <TableCell width={100}>
                      <div className="flex gap-1 ">
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
                              editPost({
                                id: row.id,
                                args: {
                                  include: {
                                    article: true,
                                  },
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
          count={postList.length}
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
