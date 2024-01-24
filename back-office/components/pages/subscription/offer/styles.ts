import { styled } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

export const MuiOutlinedButton = styled(Button)(() => ({
  color: '#376F70',
  border: '1px solid #376F70',
}));

export const MuiAvatar = styled(Avatar)(() => ({
  height: '235px',
  width: '205px',
}));

export const MuiContainedButton = styled(Button)(() => ({
  textTransform: 'lowercase',
  boxShadow: 'none',
}));

export const MuiIconButton = styled(IconButton)(() => ({
  height: '100%',
  width: '285px',
  borderRadius: 16,
  border: '2px dashed gray',
  color: 'gray',
}));
