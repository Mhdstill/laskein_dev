import { styled } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

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
