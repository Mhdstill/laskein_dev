import { CssBaseline } from '@mui/material';
import {
  ThemeProvider as MUIThemeProvider,
  StyledEngineProvider,
} from '@mui/material/styles';
import themes from '..';
import { useAppSelector } from '../../../services/redux/hooks';

export default function ThemeProvider({ children }: any) {
  const ui = useAppSelector((state) => state.ui);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={themes(ui)}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
