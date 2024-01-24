import Close from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import classNames from 'classnames';
import EmailDTO from 'data/dto/Email.dto';
import moment from 'moment';
import { MuiContainedButton } from './styles';

type BoxDetailDialogProps = {
  email?: EmailDTO;
  open: boolean;
  /* eslint-disable */
  setOpen: (show: boolean) => void;
};

export default function MailDetailsDialog({
  email,
  open,
  setOpen,
}: BoxDetailDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="md"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">
        <div className="w-full flex items-center justify-between">
          <div>
            <Typography variant="h5" color="primary">
              De <b>{email?.sender}</b>
            </Typography>
          </div>
          <MuiContainedButton
            startIcon={<Close />}
            variant="contained"
            color="warning"
            onClick={() => setOpen(false)}
            className="bg-orange-400 text-white "
          >
            Fermer
          </MuiContainedButton>
        </div>
      </DialogTitle>

      <DialogContent className="min-h-[450px]">
        <div className="lg:h-[200px] md:h-[200px] sm:h-auto flex flex-col gap-2.5 w-full py-2">
          <div className="flex flex-col pb-20 gap-10">
            {email?.emails?.length &&
              email?.emails.map((item) => (
                <div
                  key={item?.date}
                  className={classNames(
                    (email?.emails?.length as number) > 1 &&
                      'border-b border-dashed border-gray-100'
                  )}
                >
                  <div className="text-[12px]">
                    Le :{moment(item?.date).format('DD/MM/YYYY à hh:mm:ss')}
                  </div>
                  <div className="italic">{item.subject}</div>
                  {item?.html ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item?.html as string,
                      }}
                    ></div>
                  ) : (
                    <div>
                      {item?.textAsHtml ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item?.textAsHtml as string,
                          }}
                        ></div>
                      ) : (
                        item?.text
                      )}
                    </div>
                  )}
                </div>
              ))}
          </div>
          {!email?.emails?.length && <div>Aucun contenu</div>}
        </div>
      </DialogContent>

      {/* <DialogActions>
        <div className="w-full flex gap-2.5 justify-end px-4">
          <MuiContainedButton
            variant="contained"
            color="warning"
            startIcon={<Forward />}
            onClick={() => setOpen(false)}
            className="!bg-orange-500 !normal-case text-white"
          >
            Transférer
          </MuiContainedButton>

          <MuiContainedButton
            variant="contained"
            color="primary"
            startIcon={<Send />}
            className="!normal-case bg-[#376F70] text-white"
            onClick={() => setOpen(false)}
          >
            Répondre
          </MuiContainedButton>
        </div>
      </DialogActions> */}
    </Dialog>
  );
}
