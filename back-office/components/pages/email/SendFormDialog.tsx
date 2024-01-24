import AttachFile from '@mui/icons-material/AttachFile';
import Close from '@mui/icons-material/Close';
import CloseRounded from '@mui/icons-material/CloseRounded';
import Delete from '@mui/icons-material/Delete';
import Image from '@mui/icons-material/Image';
import Link from '@mui/icons-material/Link';
import Send from '@mui/icons-material/Send';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { MuiContainedButton, MuiIconButton } from './styles';

type BoxDetailDialogProps = {
  open: boolean;
  /* eslint-disable */
  setOpen: (show: boolean) => void;
};

export default function SendFormDialog({
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
          <Typography variant="h5" color="primary">
            Nouveau mail
          </Typography>
          <MuiContainedButton
            startIcon={<Close />}
            variant="contained"
            color="warning"
            onClick={() => setOpen(false)}
            className="bg-orange-400 text-white"
          >
            Fermer
          </MuiContainedButton>
        </div>
      </DialogTitle>

      <DialogContent className="min-h-[300px]">
        <div className="flex flex-col gap-2.5 w-full py-2">
          <div className="h-full w-full flex gap-2.5 justify-between lg:flex-row md:flex-row sm:flex-col">
            <TextField variant="outlined" label="A" fullWidth size="small" />{' '}
            <TextField
              variant="outlined"
              label="Object"
              fullWidth
              size="small"
            />
            <TextField variant="outlined" label="Cc" fullWidth size="small" />
          </div>
          <div className="h-full w-full flex gap-2.5 justify-between">
            <TextField
              variant="outlined"
              label="Message"
              fullWidth
              rows={6}
              multiline
              size="small"
            />
          </div>
          <div className="h-full w-full flex gap-2.5 justify-end">
            <MuiIconButton>
              <Image className="text-[#4B5E65]" />
            </MuiIconButton>
            <MuiIconButton>
              <AttachFile className="text-[#4B5E65]" />
            </MuiIconButton>
            <MuiIconButton>
              <Link className="text-[#4B5E65]" />
            </MuiIconButton>
            <MuiIconButton>
              <Delete className="text-[#4B5E65]" />
            </MuiIconButton>
          </div>
        </div>
      </DialogContent>

      <DialogActions>
        <div className="w-full flex gap-2.5 justify-end px-4">
          <MuiContainedButton
            variant="contained"
            color="warning"
            startIcon={<CloseRounded />}
            onClick={() => setOpen(false)}
            className="!bg-orange-500 !normal-case text-white"
          >
            Annuler
          </MuiContainedButton>

          <MuiContainedButton
            variant="contained"
            color="primary"
            startIcon={<Send />}
            className="!normal-case bg-[#376F70] text-white"
            sx={{
              background: '#376F70',
            }}
            onClick={() => setOpen(false)}
          >
            Enregistrer
          </MuiContainedButton>
        </div>
      </DialogActions>
    </Dialog>
  );
}
