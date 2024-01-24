import ConfirmationNumber from '@mui/icons-material/ConfirmationNumber';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import CodeIcon from '../../icons/svg/CodeIcon';

export default function ConfirmCodeComponent() {
  const router = useRouter();

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#2F435E]">
      <div className="bg-white px-12 py-2.5 rounded-[10px] w-[519px] flex flex-col items-center gap-[25px]">
        <Typography variant="h4" align="center" color="primary">
          LasKein
        </Typography>

        <div className="flex gap-2.5 w-full items-center">
          <div className="w-full h-[1px] bg-[#2F435E]"></div>
          <div className="w-[168px] h-[174px]">
            <CodeIcon />
          </div>
          <div className="w-full h-[1px] bg-[#2F435E]"></div>
        </div>

        <div className="flex flex-col gap-2.5 w-full">
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            label="Votre code de confirmation"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ConfirmationNumber />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <Button
          variant="contained"
          size="medium"
          fullWidth
          color="primary"
          className="bg-[#2F435E]"
        >
          Valider
        </Button>

        <div
          className="flex w-full justify-center items-center"
          onClick={() => router.push('/auth/login')}
        >
          <Button variant="text" size="small">
            Se connecter
          </Button>
        </div>

        <div className="w-full h-[1px] bg-[#2F435E]"></div>

        <Typography variant="body2" color="primary" align="center">
          Copyright © 2023 Laskein powered by Objectif
        </Typography>
      </div>
    </div>
  );
}
