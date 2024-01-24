import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { closeSnackbar } from '../../../services/redux/notification/notificationSlice';

export const ActionBtn = (key: any) => {
  const dispatch = useDispatch();
  return (
    <IconButton
      aria-label="close"
      color="inherit"
      sx={{ p: 0.5 }}
      onClick={() => {
        dispatch(closeSnackbar({ key }));
      }}
    >
      <CloseIcon />
    </IconButton>
  );
};
