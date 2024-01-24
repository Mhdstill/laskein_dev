import React from 'react';

import Visibility from '@mui/icons-material/Visibility';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import classNames from 'classnames';
import TableLoading from 'components/shared/loading/TableLoading';
import EmailDTO from 'data/dto/Email.dto';
import moment from 'moment';
import emailSA from 'services/applicatif/email.sa';
import MailDetailsDialog from './MailDetailsDialog';

type EmailTableProps = {
  page: number;
  rowsPerPage: number;
};

export default function EmailTable(props: EmailTableProps) {
  const { page, rowsPerPage } = props;
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [emailList, setEmailList] = React.useState<EmailDTO[]>([]);

  const { getEmailList } = emailSA();

  React.useEffect(() => {
    function fetchEmailList() {
      setLoading(true);
      getEmailList(rowsPerPage, page)
        .then((res) => {
          setEmailList([...res]);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
    fetchEmailList();
  }, [rowsPerPage, page]);

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const [showMailDetail, setShowMailDetail] = React.useState<boolean>(false);
  const [selectedEmail, setSelectedEmail] = React.useState<
    EmailDTO | undefined
  >(undefined);

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            {loading && <TableLoading />}
            <Table aria-labelledby="tableTitle" size={'small'}>
              <TableBody>
                {emailList.map((row: EmailDTO, index) => {
                  const isItemSelected = isSelected(row.sender as string);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) =>
                        handleClick(event, row.sender as string)
                      }
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.sender}
                      selected={isItemSelected}
                    >
                      <TableCell component="td" id={labelId} className="w-full">
                        De <b>{row.sender}</b> <br />
                        <div className="flex flex-col gap-3">
                          {row?.emails?.length &&
                            row?.emails.map((item) => (
                              <div
                                key={item?.date}
                                className={classNames(
                                  (row?.emails?.length as number) > 1 &&
                                    'border-l-2 border-gray-300 pl-2'
                                )}
                              >
                                <div className="text-[12px]">
                                  Le :
                                  {moment(item?.date).format(
                                    'DD/MM/YYYY à hh:mm:ss'
                                  )}
                                </div>
                                <div className="italic">{item.subject}</div>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      (item?.text?.slice(0, 100) as string) +
                                      '...',
                                  }}
                                ></div>
                              </div>
                            ))}
                        </div>
                        {!row?.emails?.length && <div>Aucun contenu</div>}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          color="info"
                          onClick={() => {
                            setSelectedEmail(row);
                            setShowMailDetail(true);
                          }}
                        >
                          <Visibility />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {!emailList && (
                  <TableRow>
                    <p>Aucun email trouvé</p>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      <MailDetailsDialog
        open={showMailDetail}
        setOpen={setShowMailDetail}
        email={selectedEmail}
      />
    </>
  );
}
