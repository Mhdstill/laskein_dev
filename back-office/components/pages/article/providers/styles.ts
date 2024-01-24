import { styled } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

export const MuiOutlinedButton = styled(Button)(() => ({
  color: '#376F70',
  border: '1px solid #376F70',
}));

export const MuiAvatar = styled(Avatar)(() => ({
  maxHeight: '100px',
  maxWidth: '100%',
  width: '150px',
  height: 'auto',
  objectFit: 'cover',
}));

export const MuiContainedButton = styled(Button)(() => ({
  textTransform: 'lowercase',
  boxShadow: 'none',
}));

export const MuiIconButton = styled(IconButton)(() => ({
  height: '100px',
  width: '100%',
  border: '1px dashed lightgray',
  color: 'lightgray',
  borderRadius: 6,
}));
