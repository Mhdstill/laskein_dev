import Close from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import UserDetails from '../user/UserDetails';
import { MuiContainedButton } from './styles';

type UserDetailDialogProps = {
  open: boolean;
  /* eslint-disable */
  setOpen: (show: boolean) => void;
};

export default function UserDetailDialog({
  open,
  setOpen,
}: UserDetailDialogProps) {
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
            Details de l&apos;utilisateur
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
      <div className="pl-4">
        <UserDetails />
      </div>
    </Dialog>
  );
}
