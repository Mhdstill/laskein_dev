import React from 'react';

import TablePagination from '@mui/material/TablePagination';

type PaginationProps = {
  list: any[];
  page: number;
  // eslint-disable-next-line no-unused-vars
  setPage: (p: number) => void;
};

export default function Pagination(props: PaginationProps) {
  const { list, page, setPage } = props;

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={list.length}
      rowsPerPage={rowsPerPage}
      labelRowsPerPage="Ligne(s) par page"
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
