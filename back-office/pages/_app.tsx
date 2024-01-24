import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ConfirmProvider } from 'material-ui-confirm';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';

import SocketProvider from 'components/pages/auth/SocketProvider';
import AuthProvider from '../components/pages/auth/AuthProvider';
import NotificationProvider from '../components/shared/notification/NotificationProvider';
import { store } from '../services/redux/store';
import '../styles/globals.css';
import ThemeProvider from '../utils/themes/context/themeProvider';

const inter = Inter({ subsets: ['latin'] });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <main className={inter.className}>
            <ConfirmProvider>
              <AuthProvider>
                <SocketProvider>
                  <SnackbarProvider>
                    <NotificationProvider></NotificationProvider>
                    <Component {...pageProps} />
                  </SnackbarProvider>
                </SocketProvider>
              </AuthProvider>
            </ConfirmProvider>
          </main>
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
