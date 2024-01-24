import { styled } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

export const MuiIconButton = styled(IconButton)(() => ({
  height: '144px',
  width: '349px',
  borderRadius: 0,
  border: '2px dashed lightgray',
  color: 'lightgray',
}));

export const MuiAvatar = styled(Avatar)(() => ({
  height: '144px',
  width: '349px',
  borderRadius: 16,
}));
