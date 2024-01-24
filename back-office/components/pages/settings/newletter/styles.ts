import { styled } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

export const MuiOutlinedButton = styled(Button)(() => ({
  color: '#376F70',
  border: '1px solid #376F70',
}));

export const MuiAvatar = styled(Avatar)(() => ({
  height: '38px',
  width: '100%',
}));

export const MuiContainedButton = styled(Button)(() => ({
  boxShadow: 'none',
}));

export const MuiIconButton = styled(IconButton)(() => ({
  color: 'lightgray',
}));
